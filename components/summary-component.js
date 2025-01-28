import { LitElement, html } from "lit";
import { calculateSummary, processPayment } from "../controllers/summary.js";

export class SummaryComponent extends LitElement {
  // Definimos las propiedades que se utilizarán para almacenar los cálculos del resumen
  static properties = {
    subtotal: { type: Number }, // Subtotal de los productos seleccionados
    iva: { type: Number }, // IVA (19%) calculado sobre el subtotal
    total: { type: Number }, // Total a pagar (subtotal + IVA)
  };

  constructor() {
    super();
    // Inicializamos las propiedades con valores por defecto
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  connectedCallback() {
    super.connectedCallback();

    // Calcula el resumen inicial cuando se monta el componente
    calculateSummary(this);

    // Escucha un evento personalizado ("detailUpdated") que notifica cambios en el detalle
    document.addEventListener("detailUpdated", (event) => {
      const details = event.detail; // Obtenemos los datos del evento (detalles de los productos)

      // Calculamos el subtotal sumando los subtotales de todos los productos
      this.subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);

      // Calculamos el IVA (19% del subtotal)
      this.iva = this.subtotal * 0.19;

      // Calculamos el total sumando el subtotal y el IVA
      this.total = this.subtotal + this.iva;
    });
  }

  render() {
    return html`
      <!-- Incluimos el diseño de Bootstrap para estilos -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      <br />
      <div class="container card">
        <!-- Encabezado del componente -->
        <div class="row text-center card-header">
          <h3>Resumen de Factura</h3>
        </div>
        <div class="card-body">
          <!-- Campo para mostrar el Subtotal -->
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Subtotal</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.subtotal)}" <!-- Mostramos el subtotal en formato moneda -->
                disabled
                readonly
              />
            </div>
          </div>
          <!-- Campo para mostrar el IVA -->
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">IVA (19%)</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.iva)}" <!-- Mostramos el IVA en formato moneda -->
                disabled
                readonly
              />
            </div>
          </div>
          <!-- Campo para mostrar el Total -->
          <div class="row mb-3">
            <label class="col-sm-4 col-form-label">Total</label>
            <div class="col-sm-8">
              <input
                class="form-control text-center"
                type="text"
                .value="${this._formatCurrency(this.total)}" <!-- Mostramos el total en formato moneda -->
                disabled
                readonly
              />
            </div>
          </div>
          <!-- Botón para procesar el pago -->
          <div class="row">
            <button
              class="btn btn-dark col-sm-12"
              @click="${this._processPayment}" <!-- Ejecutamos la función de pago al hacer clic -->
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Función para formatear valores numéricos como moneda.
   * @param {number} value - Valor a formatear
   * @returns {string} - Valor en formato moneda (ej: $123.45)
   */
  _formatCurrency(value) {
    return `$${value.toFixed(2)}`;
  }

  /**
   * Función que se ejecuta al hacer clic en el botón "Pagar".
   * Llama a `processPayment` para realizar las acciones necesarias.
   */
  _processPayment() {
    processPayment(this);
  }
}

// Registramos el componente como un custom element
customElements.define("summary-component", SummaryComponent);

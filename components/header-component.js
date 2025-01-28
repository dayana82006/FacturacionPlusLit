import { LitElement, html } from 'lit';
import { validateHeaderInputs } from '../controllers/header.js';

export class HeaderComponent extends LitElement {
  constructor() {
    super();
    // Genera un ID único para la factura basado en la marca de tiempo actual, convertido a hexadecimal en mayúsculas
    this.id = Date.now().toString(16).toUpperCase();
  }

  render() {
    return html`
      <!-- Incluye el diseño de Bootstrap para estilos -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div class="container text-center card">
        <!-- Encabezado de la tarjeta -->
        <div class="row align-items-start card-header">
          <h3>FACTURACION PLUS - No. Factura</h3>
          <div class="col">
            <!-- Campo de texto deshabilitado para mostrar el ID único de la factura -->
            <input
              id="invoiceID"
              class="form-control text-center"
              type="text"
              .value="${this.id}" <!-- Muestra el ID generado -->
              aria-label="Disabled input example"
              disabled
              readonly
            />
          </div>
        </div>
        <div class="card-body">
          <!-- Sección para ingresar el número de identificación del cliente -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">No. Id</label>
            <div class="col-sm-10">
              <input class="form-control" id="idClient" />
            </div>
          </div>
          <!-- Sección para ingresar nombres y apellidos del cliente -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombres</label>
            <div class="col-sm-4">
              <input class="form-control" id="nameClient" />
            </div>
            <label class="col-sm-2 col-form-label">Apellidos</label>
            <div class="col-sm-4">
              <input class="form-control" id="lastNameClient" />
            </div>
          </div>
          <!-- Sección para ingresar la dirección del cliente -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Dirección</label>
            <div class="col-sm-10">
              <input class="form-control" id="direction" />
            </div>
          </div>
          <!-- Sección para ingresar el correo electrónico del cliente -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input class="form-control" id="email" type="email" />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Se ejecuta una vez que el componente se ha renderizado por primera vez.
   * Aquí se configura un evento para validar los inputs al interactuar con ellos.
   */
  firstUpdated() {
    // Escucha el evento 'input' en todos los campos del componente
    this.shadowRoot.addEventListener('input', () => {
      // Llama a la función de validación pasando el shadowRoot del componente
      validateHeaderInputs(this.shadowRoot);
    });
  }
}

// Define el componente personalizado con el nombre 'header-component'
customElements.define('header-component', HeaderComponent);

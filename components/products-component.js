// Importamos LitElement y html para crear componentes web y estructurar su contenido
import { LitElement, html } from "lit";
// Importamos funciones de controladores externos para manejar productos y detalles
import { listProduct } from "../controllers/products.js";
import { addProductToDetail } from "../controllers/detail.js";

// Definimos el componente ProductsComponent que extiende LitElement
export class ProductsComponent extends LitElement {
  // Constructor del componente
  constructor() {
    super();
  }

  // Método render que define la estructura HTML del componente
  render() {
    return html`
      <!-- Enlace a Bootstrap para estilos predefinidos -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <br />
      <!-- Contenedor principal del componente -->
      <div class="container card">
        <div class="card-body text-center">
          <!-- Campo para mostrar el código del producto (deshabilitado) -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Código de Producto</label>
            <div class="col-sm-10">
              <input
                id="productIdInput"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
          </div>

          <!-- Campo para seleccionar el nombre del producto -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Nombre de Producto</label>
            <div class="col-sm-10">
              <select id="productList" class="form-select">
                <option value="">Elige tu producto</option>
              </select>
            </div>
          </div>

          <!-- Campos para ingresar el valor unitario y la cantidad -->
          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Valor Unitario</label>
            <div class="col-sm-4">
              <input
                id="unitaryValue"
                class="form-control text-center"
                type="text"
                value=""
                disabled
                readonly
              />
            </div>
            <label class="col-sm-2 col-form-label">Cantidad</label>
            <div class="col-sm-4">
              <input
                id="quantity"
                class="form-control"
                type="number"
                min="1"
                step="1"
              />
            </div>
          </div>

          <!-- Botón para agregar el producto a la lista -->
          <div class="mb-3 row">
            <button
              id="addButton"
              type="button"
              class="btn btn-outline-dark col-sm-12"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Método que se ejecuta cuando el componente se renderiza por primera vez
  firstUpdated() {
    // Llamamos a listProduct para cargar los productos disponibles
    listProduct(this);

    // Referencias a los elementos del Shadow DOM
    const productIdInput = this.shadowRoot.querySelector("#productIdInput");
    const productList = this.shadowRoot.querySelector("#productList");
    const unitaryValueInput = this.shadowRoot.querySelector("#unitaryValue");
    const quantityInput = this.shadowRoot.querySelector("#quantity");
    const addButton = this.shadowRoot.querySelector("#addButton");

    // Evento para manejar el clic en el botón "Agregar"
    addButton.addEventListener("click", () => {
      // Obtenemos los valores ingresados y seleccionados por el usuario
      const productId = productIdInput.value;
      const productName =
        productList.options[productList.selectedIndex]?.textContent;
      const unitaryValue = parseFloat(
        unitaryValueInput.value.replace("$", "").trim()
      );
      const quantity = parseInt(quantityInput.value, 10);

      // Validación para asegurarnos de que los datos sean válidos
      if (productId && productName && unitaryValue && quantity > 0) {
        // Creamos un objeto con los datos del producto
        const product = {
          cod: productId,
          product: productName,
          price: unitaryValue,
          quantity: quantity,
        };

        // Llamamos a la función para agregar el producto al detalle
        addProductToDetail(product);

        // Limpiamos los campos de entrada después de agregar el producto
        quantityInput.value = "";
        productList.value = "";
        productIdInput.value = "";
        unitaryValueInput.value = "";
      } else {
        // Mostramos un mensaje de error si los datos no son válidos
        alert("Por favor, seleccione un producto y una cantidad válida.");
      }
    });
  }
}

// Registramos el componente con un nombre único
customElements.define("products-component", ProductsComponent);

import { dataBase } from "../js/data.js";

/**
 * Función para listar los productos en un componente y actualizar los campos correspondientes
 * al seleccionar un producto.
 * @param {HTMLElement} productsComponent - El componente que contiene el listado de productos.
 */
export function listProduct(productsComponent) {
  // Referencias a los elementos dentro del Shadow DOM del componente.
  const item = productsComponent.shadowRoot.querySelector("#productList");
  const productIdInput = productsComponent.shadowRoot.querySelector("#productIdInput");
  const unitaryValueInput = productsComponent.shadowRoot.querySelector("#unitaryValue");

  // Agregar los productos al select de opciones dentro del Shadow DOM.
  dataBase.forEach((element) => {
    const option = document.createElement("option"); // Crear un nuevo elemento <option>.
    option.value = element.id; // El valor de la opción es el ID del producto.
    option.textContent = element.product; // El texto mostrado en la opción es el nombre del producto.
    item.appendChild(option); // Agregar la opción al select.
  });

  // Evento para actualizar los campos de código y valor unitario al seleccionar un producto.
  item.addEventListener("change", (event) => {
    const selectedProductId = event.target.value; // Obtener el ID del producto seleccionado.
    const selectedProduct = dataBase.find((product) => product.id === selectedProductId); // Buscar el producto en la base de datos.

    // Validación para asegurarse de que se haya seleccionado un producto válido.
    if (selectedProduct) {
      productIdInput.value = selectedProduct.cod; // Actualizar el campo de código con el valor del producto.
      unitaryValueInput.value = `$ ${selectedProduct.price}`; // Actualizar el campo de valor unitario con el precio del producto.
    } else {
      // Limpiar los campos si no hay un producto válido seleccionado.
      productIdInput.value = "";
      unitaryValueInput.value = "";
    }
  });
}

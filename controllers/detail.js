// Array global para almacenar los detalles del producto
const detailData = [];

// Función para agregar o actualizar un producto en la tabla de detalles
export function addProductToDetail(product) {
  // Busca si el producto ya existe en el array de detalles
  const existingProduct = detailData.find((item) => item.cod === product.cod);

  if (existingProduct) {
    // Si el producto ya existe, se actualiza la cantidad y el subtotal
    existingProduct.quantity += product.quantity;
    existingProduct.subtotal = existingProduct.quantity * existingProduct.price;
  } else {
    // Si el producto no existe, se agrega el nuevo producto al array
    detailData.push({
      ...product, // Crea una copia del producto con sus propiedades
      subtotal: product.quantity * product.price, // Calcula el subtotal
    });
  }

  // Crear un evento personalizado para notificar que los detalles han sido actualizados
  const event = new CustomEvent("detailUpdated", {
    detail: [...detailData], // Envia una copia actualizada del array de detalles
  });
  document.dispatchEvent(event); // Despacha el evento para notificar a otros componentes
}

// Función para eliminar un producto en la tabla de detalles
export function removeProductFromDetail(cod) {
  // Busca el índice del producto que corresponde con el código proporcionado
  const index = detailData.findIndex((item) => item.cod === cod);
  
  if (index !== -1) {
    // Si se encuentra el producto, se elimina del array
    detailData.splice(index, 1);

    // Crear un evento personalizado para notificar que los detalles han sido actualizados
    const event = new CustomEvent("detailUpdated", {
      detail: [...detailData], // Envía una copia del array después de eliminar el producto
    });
    document.dispatchEvent(event); // Despacha el evento para actualizar otros componentes
  }
}

// Función para obtener los detalles del producto
export function getInvoiceDetails() {
  // Devuelve una copia del array 'detailData' para asegurar que no se modifique directamente desde fuera
  return [...detailData];
}

// Función para limpiar los datos del detalle
export function clearDetails() {
  // Vacía el array de detalles, eliminando todos los productos
  detailData.length = 0;

  // Crear un evento personalizado para notificar que los detalles han sido limpiados
  const event = new CustomEvent("detailUpdated", { detail: [] });
  document.dispatchEvent(event); // Despacha el evento para notificar a otros componentes
}

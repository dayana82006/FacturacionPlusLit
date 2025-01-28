import { getInvoiceDetails } from "./detail.js";

// Obtener las facturas guardadas en el localStorage o iniciar un arreglo vacío si no existen
let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

/**
 * Función para calcular el resumen de la factura y actualizar las propiedades del componente.
 * @param {HTMLElement} summaryComponent - El componente donde se muestra el resumen de la factura.
 */
export function calculateSummary(summaryComponent) {
  // Escuchar el evento 'detailUpdated' para realizar el cálculo del resumen
  document.addEventListener("detailUpdated", (event) => {
    const details = event.detail; // Obtener los detalles de la factura desde el evento

    // Calcular los valores del resumen (subtotal, IVA y total)
    summaryComponent.subtotal = details.reduce((acc, item) => acc + item.subtotal, 0);
    summaryComponent.iva = summaryComponent.subtotal * 0.19; // 19% de IVA
    summaryComponent.total = summaryComponent.subtotal + summaryComponent.iva; // Total = Subtotal + IVA
  });
}

/**
 * Función para procesar el pago de la factura.
 * Valida los datos de la factura, guarda la factura y recarga la página.
 * @param {HTMLElement} summaryComponent - El componente que contiene el resumen de la factura.
 */
export function processPayment(summaryComponent) {
  // Obtener la información del encabezado y los detalles de la factura
  const header = getHeaderInfo();
  const detailFact = getInvoiceDetails();

  // Validación para asegurar que todos los datos necesarios estén completos
  if (!header || detailFact.length === 0) {
    alert("Por favor complete todos los campos y registre productos en la factura.");
    return; // Si no se completan los datos, no se procesa el pago
  }

  // Crear la factura con la información obtenida
  const factura = {
    nroFactura: _getInvoiceID(), // Obtener el ID de la factura
    header, // Información del encabezado
    detailFact, // Detalles de la factura
    summary: { // Resumen con los valores calculados
      subtotal: summaryComponent.subtotal,
      iva: summaryComponent.iva,
      total: summaryComponent.total,
    },
  };

  // Guardar la factura en el arreglo de facturas y en el localStorage
  facturas.push(factura);
  localStorage.setItem("facturas", JSON.stringify(facturas));

  // Notificar al usuario que la factura se generó con éxito
  alert("¡Factura generada con éxito!");
  
  // Recargar la página para reiniciar el proceso
  reloadPage();
}

/**
 * Función para obtener la información del encabezado desde el componente del encabezado.
 * @returns {Object|null} - Retorna un objeto con la información del encabezado o null si falta algún dato.
 */
function getHeaderInfo() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;

  if (!headerComponent) return null;

  // Obtener los valores de los campos de entrada en el encabezado
  const identificacion = headerComponent.querySelector("#idClient")?.value.trim();
  const nombres = headerComponent.querySelector("#nameClient")?.value.trim();
  const apellido = headerComponent.querySelector("#lastNameClient")?.value.trim();
  const direccion = headerComponent.querySelector("#direction")?.value.trim();
  const email = headerComponent.querySelector("#email")?.value.trim();

  // Verificar que todos los campos tengan valor
  if (!identificacion || !nombres || !apellido || !direccion || !email) {
    return null;
  }

  // Retornar la información del encabezado
  return { identificacion, nombres, apellido, direccion, email };
}

/**
 * Función privada para obtener el ID de la factura.
 * @returns {string|null} - Retorna el ID de la factura o null si no se encuentra.
 */
function _getInvoiceID() {
  const headerComponent = document.querySelector("header-component")?.shadowRoot;
  return headerComponent?.querySelector("#invoiceID")?.value.trim() || null;
}

/**
 * Función para recargar la página después de un pago exitoso.
 */
export function reloadPage() {
  setTimeout(() => {
    location.reload(); // Recargar la página después de un pequeño retraso
  }, 500);
}

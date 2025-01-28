/**
 * Función para validar los campos de entrada del encabezado en un formulario.
 * La validación se realiza en tiempo real mientras el usuario ingresa los datos.
 * @param {ShadowRoot} shadowRoot - El Shadow DOM donde se encuentran los elementos del formulario.
 */
export function validateHeaderInputs(shadowRoot) {
  // Selección de los elementos del formulario dentro del shadowRoot.
  const idInput = shadowRoot.querySelector("#idClient");
  const nameInput = shadowRoot.querySelector("#nameClient");
  const lastNameInput = shadowRoot.querySelector("#lastNameClient");
  const directionInput = shadowRoot.querySelector("#direction");
  const emailInput = shadowRoot.querySelector("#email");

  // Definición de expresiones regulares para las validaciones.
  const validations = {
    id: /^\d+$/, // Solo permite números.
    text: /^[a-zA-ZÀ-ÿ\s]+$/, // Permite letras y espacios (para nombres y apellidos).
    direction: /^[a-zA-Z0-9\s\.,#\-]+$/, // Permite letras, números y algunos caracteres especiales en dirección.
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Correo electrónico válido.
  };

  /**
   * Función para validar el valor de un campo de entrada.
   * @param {HTMLElement} input - El campo de entrada a validar.
   * @param {RegExp} regex - La expresión regular que define el formato válido.
   * @returns {boolean} - Retorna true si el valor es válido, false si no lo es.
   */
  function validate(input, regex) {
    const value = input.value.trim(); // Obtener el valor del campo de entrada y eliminar espacios al principio y al final.
    const isValid = regex.test(value); // Verificar si el valor cumple con la expresión regular.
    
    // Si la validación falla, agregar la clase 'is-invalid' y eliminar la clase 'is-valid'.
    if (!isValid) {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    } else {
      // Si la validación es correcta, agregar la clase 'is-valid' y eliminar la clase 'is-invalid'.
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
    
    return isValid; // Retornar el resultado de la validación (true o false).
  }

  // Añadir eventos de tipo 'input' a los campos de entrada para validarlos en tiempo real.
  idInput.addEventListener("input", () => validate(idInput, validations.id));
  nameInput.addEventListener("input", () => validate(nameInput, validations.text));
  lastNameInput.addEventListener("input", () => validate(lastNameInput, validations.text));
  directionInput.addEventListener("input", () => validate(directionInput, validations.direction));
  emailInput.addEventListener("input", () => validate(emailInput, validations.email));
}

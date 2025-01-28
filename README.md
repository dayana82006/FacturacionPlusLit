# Gestión de Facturas con Lit + Vite

Este proyecto es una aplicación web para la **gestión de facturas** creada con **Lit** y estructurada utilizando **Vite** como herramienta de construcción. Ofrece una experiencia intuitiva para gestionar productos, calcular totales y almacenar facturas en el navegador.

---

## **Tecnologías Utilizadas**

- **Lit**: Para la creación de componentes web reutilizables y encapsulados con Shadow DOM.
- **Vite**: Para la generación del proyecto y manejo de la estructura modular.
- **Bootstrap**: Para estilos y diseño visual moderno.
- **JavaScript**: Para la lógica y funcionalidades dinámicas.
- **Local Storage**: Para almacenar datos de facturas de forma temporal en el navegador.

---

## **Estructura del Proyecto**

El proyecto se organiza en **componentes reutilizables**, diseñados para cubrir las diferentes funcionalidades necesarias en la gestión de facturas. A continuación, se describen los componentes principales:

### **1. `header-component`**
- Recopila los datos personales del cliente:  
  nombres, apellidos, identificación, dirección y email.  
- Genera un número de factura único que cambia en cada recarga de página.  
- Valida los datos ingresados en tiempo real.

### **2. `products-component`**
- Permite seleccionar productos desde una lista precargada.  
- Carga automáticamente el código y el precio unitario del producto seleccionado.  
- Incluye validaciones para evitar duplicar productos y permite eliminar ítems individuales.  

### **3. `summary-component`**
- Calcula automáticamente:
  - **Subtotal**: La sumatoria de los valores de todos los productos seleccionados.
  - **IVA (19%)**: Calculado sobre el subtotal.
  - **Total**: Suma del subtotal e IVA.
- Permite almacenar la factura generada en el navegador para consultas futuras.

---

## **Lógica de la Aplicación**

### **1. Generación de Número de Factura**
- Se crea un número único al recargar la página utilizando valores aleatorios.

### **2. Selección de Productos**
- El usuario selecciona un producto disponible en la lista, y los campos de código y precio se completan automáticamente.  
- Al ingresar la cantidad y presionar "Agregar", el producto se incluye en el detalle de la factura.  
- Si el producto ya está en la lista, se actualiza la cantidad en lugar de duplicarlo.

### **3. Resumen y Cálculo de Precios**
- Los totales se calculan automáticamente con base en los productos añadidos.  
- Incluye validaciones para evitar errores de ingreso.

### **4. Almacenamiento en Local Storage**
- Los datos de la factura se almacenan temporalmente en el navegador:
  - Datos del cliente.
  - Detalle de los productos.
  - Totales de la factura.  

---



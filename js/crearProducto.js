import { conexionAPI } from "./conexionApi.js";

const formulario = document.querySelector("[data-formulario]");
const clearButton = document.getElementById('clearButton');


async function crearProducto(evento) {

    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    const descuento = document.querySelector("[data-descuento]").value;

    try {

            
    // Limpiar los errores previos
    limpiarErrores();

    // Verificar si alguno de los campos está vacío
    let valid = true;

    if (!nombre) {
        mostrarError("error-nombre", "Este campo es obligatorio", "nombre");
        valid = false;
    }
    if (!precio) {
        mostrarError("error-precio", "Este campo es obligatorio", "precio");
        valid = false;
    }
    if (!imagen) {
        mostrarError("error-imagen", "Este campo es obligatorio", "imagen");
        valid = false;
    }
    if (!descuento) {
        mostrarError("error-descuento", "Este campo es obligatorio", "descuento");
        valid = false;
    }

    if (valid) {
        await conexionAPI.enviarProducto(nombre,precio,imagen,descuento);
        alert("registro de producto exitoso");
    }


    } catch (e) {
        alert(e)
    }
    
}


function mostrarError(errorId, mensaje, inputData) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.querySelector(`[data-${inputData}]`);
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block'; 
    inputElement.classList.add('error-field'); 
}


function limpiarErrores() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach((element) => {
        element.style.display = 'none'; 
    });

    const inputElements = document.querySelectorAll('.imput');
    inputElements.forEach((input) => {
        input.classList.remove('error-field'); 
    });
}


clearButton.addEventListener('click', function() {
    formulario.reset(); 
    limpiarErrores();
  });

formulario.addEventListener("submit",evento => crearProducto(evento));


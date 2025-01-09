import { conexionAPI } from "./conexionApi.js";

const lista = document.querySelector("[data-lista]");

export default function createCard(descuento,nombre,precio,imagen,id){

    const producto = document.createElement("li");

    const precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(precio);
    
    producto.className="card";

        // Aquí se genera el HTML dinámico
        producto.innerHTML = `
            <div class="discount-tag">${descuento}% Dto.</div>
            <img src="${imagen}" alt="Logo" class="card-logo" />
            <div class="card-container--info">
                <p class="product-name">${nombre}</p>
                <div class="card-container--value">
                    <p class="product-price">${precioFormateado}</p>
                    <img src="./img/trash-icon-red.webp" alt="Transacción" class="trans-icon" />
                </div>
            </div>
    `;

      // Añadir el evento de clic al icono de eliminar
      const deleteImage = producto.querySelector('.trans-icon');
      deleteImage.addEventListener('click', () => eliminarProducto(id, producto));

    return producto;

}

async function listarProductos() {
    try {
        const listarApi = await conexionAPI.listarProductos();

              // Verificar si la lista está vacía
              if (listarApi.length === 0) {
                // Si no hay productos, mostrar mensaje
                lista.innerHTML = `<h2 class="no-productos">No tienes productos disponibles</h2>`;
            } else {
                // Si hay productos, crear las tarjetas
                listarApi.forEach(productos => lista.appendChild(createCard(productos.descuento, productos.nombre, productos.precio, productos.imagen, productos.id)));
            }
    } catch (error) {

        lista.innerHTML = `<h2 class="no-productos">No tienes productos disponibles</h2>`;
        
    }
}


async function eliminarProducto(id,productoElement) {
    
    try {

        await conexionAPI.eliminarProducto(id);
       
        productoElement.remove(); // Elimina el elemento del DOM
        alert('Producto eliminado exitosamente');

    } catch (e) {
        alert(e)
    }

}

listarProductos();
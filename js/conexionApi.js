async function listarProductos() {
    const conexion = await fetch("http://localhost:3000/productos");

    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function enviarProducto(nombre,precio,imagen,descuento) {

    const conexion = await fetch("http://localhost:3000/productos",{
        method:"POST",
        headers:{ "Content-type":"application/json",},
        body:JSON.stringify({
            descuento:descuento,
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    })

    const conexionConvertida = conexion.json();

    if(!conexion.ok || !conexion.status === 201){
        throw new Error("Ha ocurrido un error al enviar el producto");
    }

    return conexionConvertida;

}

async function eliminarProducto(id) {
        // Hacer la solicitud DELETE a la API
        const conexion = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la solicitud fue exitosa
        if (!conexion.ok || !conexion.status === 201) {
            throw new Error('No se pudo eliminar el producto');
        }
}

    
export const conexionAPI={
    listarProductos,enviarProducto,eliminarProducto
}

listarProductos();
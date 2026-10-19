////////////////////////////// variables //////////////////////////////////////////////////////777
const contenedor = document.querySelector("#contenedor_productos"); 
const urlAPI = "https://api.npoint.io/18f80c9a8ff198e55460";
const producto_a_buscar = document.querySelector("#buscador");
let lista_productos = [];
///////////////////// Funcion de verificacion para el uso de la api /////////////////////////
async function cargar_lista() {
    try {
        const respuesta = await fetch(urlAPI);

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: Código ${respuesta.status}`);
        }

        const componentes = await respuesta.json();
        return componentes;
    } catch (e) {
        console.error("No se pudieron cargar los productos:", e);
        contenedor.innerHTML = `<p class="texto_advertencia">Hubo un error al cargar los productos. Intenta más tarde.</p>`;
        return [];
    }
}
//////////// funcion para traer info dentro de la lista de productos //////////////////////////////77
async function iniciar() {
    lista_productos = await cargar_lista();
    console.log("Productos cargados y guardados:", lista_productos);
    
    if (lista_productos.length > 0) {
        renderproducto(lista_productos);
    }
}
/////////////////// Funcion encargada de convertir la info en objetos ///////////////////////7
function renderproducto(productosAMostrar = lista_productos) {
    let template = "";

    if (productosAMostrar.length === 0) {
        contenedor.innerHTML = `<p class="texto_advertencia">No se encontraron productos coincidentes.</p>`;
        return;
    }
    /////// Inspeccion de lista para juntalos con respectiva clase y dejandolas como tarjeta de productos /////////777
    productosAMostrar.forEach((producto) => {
        template += `
            <div class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.producto}">
                <h3>${producto.producto}</h3>
                <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
                <p class="descripcion">${producto.descripcion}</p>
                
                <div class="contenedor-especificaciones">
                    <strong>Especificaciones:</strong>
                    <ul>
                        <li>${producto.especificaciones[0]}</li>
                        <li>${producto.especificaciones[1]}</li>
                    </ul>
                </div>

                <button data-id="${producto.id}">Añadir al carrito</button>
            </div>
        `;
    });

    contenedor.innerHTML = template;
}
////////// Funcion para buscar en la lista de productos y luego los renderiza ///////////////////
if (producto_a_buscar) {
    producto_a_buscar.addEventListener("input", (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        const productosFiltrados = lista_productos.filter((producto) => 
            producto.producto.toLowerCase().includes(textoBusqueda)
        );
        renderproducto(productosFiltrados); 
    });
}

iniciar();
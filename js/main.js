// RECUPERAR CARRITO DE LOCALSTORAGE
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// FUNCION PARA AGREGAR AL CARRITO
function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarToast("Producto agregado al carrito"); // Función en utils.js
}

// FUNCION PARA MOSTRAR PRODUCTOS
function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  lista.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>Precio: $${producto.precio}</p>
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <button id="agregar${index}">Agregar al carrito</button>
    `;

    contenedor.appendChild(div);

    const boton = document.getElementById(`agregar${index}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}

// CARGAR PRODUCTOS DESDE JSON
let productos = [];

fetch("../data/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos);
  })
  .catch(error => {
    console.error("Error al cargar productos:", error);
  });

actualizarContadorCarrito();

// SWEETALERT - FINALIZAR COMPRA
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("Tu carrito está vacío");
  } else {
    Swal.fire({
      title: "¿Confirmás la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        mostrarResumenCompra(carrito); // Función en utils.js
        carrito.length = 0;
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
      }
    });
  }
});

// FILTRO PARA MOSTRAR LO MÁS BARATO
document.getElementById("filtro").addEventListener("click", () => {
  const productosFiltrados = productos.filter(producto => producto.precio < 210);
  mostrarProductos(productosFiltrados);
});

// VOLVER AL INICIO
document.getElementById("inicio").addEventListener("click", () => {
  mostrarProductos(productos);
});

// VACIAR CARRITO
document.getElementById("vaciarCarrito").addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("El carrito ya está vacío");
  } else {
    Swal.fire({
      title: "¿Querés vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.length = 0;
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        Swal.fire("Carrito vaciado");
      }
    });
  }
});








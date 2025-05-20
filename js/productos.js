// CARRITO
function actualizarContadorCarrito() {
  document.getElementById("contadorCarrito").textContent = carrito.length;
}

//  MOSTRAR UN TOAST CON MENSAJE
function mostrarToast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}

//  MOSTRAR UN RESUMEN CON SWEET
function mostrarResumenCompra(carrito) {
  let resumen = carrito.map((item, i) => `🛒 ${i + 1}. ${item.nombre} - $${item.precio}`).join("\n");
  resumen += `\n\nTotal: $${carrito.reduce((acc, item) => acc + item.precio, 0)}`;
  Swal.fire({
    title: "¡Gracias por tu compra!",
    icon: "success",
    text: resumen,
    customClass: {
      popup: "resumen-compra"
    }
  });
}

  
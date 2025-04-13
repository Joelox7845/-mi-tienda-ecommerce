const productos = [
  { id: 1, nombre: "Tarjeta Gráfica", categoria: "Electrónica", precio: 35000, imagen: "https://topesdegama.com/app/uploads-topesdegama.com/2022/09/graficas-portada.jpg?x=480&y=375&quality=80" },
  { id: 2, nombre: "Ram", categoria: "Componentes", precio: 80000, imagen: "https://www.mercadolibre.com.co/blog/tr/como-saber-que-memoria-ram-es-compatible-con-tu-pc-de-escritorio" },
  { id: 3, nombre: "Teclados", categoria: "Periféricos", precio: 160000, imagen: "https://clonesyperifericos.com/wp-content/uploads/2025/01/Dark-Avenger-redragon.jpg" },
  { id: 4, nombre: "Fuentes de poder", categoria: "Componentes", precio: 200000, imagen: "https://www.amazon.com/-/es/PSG1050/dp/B0CFRXQLGD" },
  { id: 5, nombre: "Chasis", categoria: "Componentes", precio: 60000, imagen: "https://compubit.com.co/producto/chasis-power-group-f909/" }
];

let carrito = [];

function mostrarProductos(lista) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = "";
  lista.forEach(prod => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${prod.nombre}</h3>
      <img src="${prod.imagen}" alt="${prod.nombre}" width="150">
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function filtrarProductos() {
  const categoria = document.getElementById('categoria').value;
  const filtrados = categoria === "todos" ? productos : productos.filter(p => p.categoria === categoria);
  mostrarProductos(filtrados);
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(prod => {
    const li = document.createElement('li');
    li.innerText = `${prod.nombre} - $${prod.precio}`;
    lista.appendChild(li);
    total += prod.precio;
  });

  document.getElementById('total').innerText = total.toFixed(2);
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});

// Simulación de pago con PayPal
paypal.Buttons({
  createOrder: function(data, actions) {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: total.toFixed(2)
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      document.getElementById('mensaje-pago').innerText = `✅ Pago completado por ${details.payer.name.given_name}`;
      vaciarCarrito();
    });
  }
}).render('#paypal-button-container');

const formReserva = document.querySelector("#formNuevaReserva");
const reservaId = formReserva.dataset.id;

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const fecha_ingreso = document.querySelector("#fecha_ingreso");
const fecha_salida = document.querySelector("#fecha_salida");
const costo_vuelo = document.querySelector("#costo_vuelo");
const telefono = document.querySelector("#telefono");
const email = document.querySelector("#email");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`/api/${reservaId}`);
  const data = await response.json();

  nombre.value = data.nombre;
  apellido.value = data.apellido;
  fecha_ingreso.value = dayjs(data.fecha_ingreso).format("DD-MM-YYYY HH:mm");
  fecha_salida.value = dayjs(data.fecha_salida).format("DD-MM-YYYY HH:mm");
  costo_vuelo.value = data.costo_vuelo;
  telefono.value = data.telefono;
  email.value = data.email;
});

formReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  reservaActualizada = {
    nombre: nombre.value,
    apellido: apellido.value,
    fecha_ingreso: fecha_ingreso.value,
    fecha_salida: fecha_salida.value,
    costo_vuelo: costo_vuelo.value,
    telefono: telefono.value,
    email: email.value,
  };

  const response = await fetch(`/api/${reservaId}`, {
    method: "PUT",
    body: JSON.stringify(reservaActualizada),
    headers: {
      "Content-Type": "application/json",
    },
  });

  alert(data.message);
});

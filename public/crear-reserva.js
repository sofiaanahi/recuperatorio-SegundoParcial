const formCrearReserva = document.querySelector("#formNuevaReserva");

formCrearReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const fecha_ingreso = document.querySelector("#fecha_ingreso").value;
  const fecha_salida = document.querySelector("#fecha_salida").value;
  const costo_vuelo = document.querySelector("#costo_vuelo").value;
  const telefono = document.querySelector("#telefono").value;
  const email = document.querySelector("#email").value;

  const reserva = {
    nombre,
    apellido,
    fecha_ingreso,
    fecha_salida,
    costo_vuelo,
    telefono,
    email,
  };

  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(reserva),
    headers: {
      "Content-Type": "application/json", // Cuando se envían datos JSON al servidor
    },
  });

  const data = await response.json();

  alert(data.message);
  window.location.href = "/";
});

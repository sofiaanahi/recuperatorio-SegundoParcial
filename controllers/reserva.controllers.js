const Reserva = require("../models/Reserva");
const ctrlReservas = {};

ctrlReservas.renderListaReservas = (req, res) => {
  res.render("index-lista");
};

ctrlReservas.renderFormNuevaReserva = (req, res) => {
  res.render("nueva-reserva");
};

ctrlReservas.renderFormEditarReserva = (req, res) => {
  res.render("editar-reserva");
};

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas

ctrlReservas.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: {
        estado: true,
      },
    });

    return res.json(reservas);
  } catch (error) {
    console.log("ERROR AL OBTENER LAS RESERVAS ", error);
    return res.status(500).json({
      message: "ERROR AL OBTENER LAS RESERVAS",
    });
  }
};

// Obtener una reserva
ctrlReservas.obtenerReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    return res.json(reserva);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ERROR AL OBTENER LA RESERVA",
    });
  }
};

// Crear una reserva

ctrlReservas.crearReserva = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_ingreso,
    fecha_salida,
    costo_vuelo,
    telefono,
    email,
  } = req.body;

  try {
    const nuevaReserva = new Reserva({
      nombre,
      apellido,
      fecha_ingreso,
      fecha_salida,
      costo_vuelo,
      telefono,
      email,
    });

    await nuevaReserva.save();

    return res.status(201).json({ message: "RESERVA CREADA CON EXITO" });
  } catch (error) {
    console.log("ERROR AL CREAR LA RESERVA", error);
    return res.status(500).json({ message: "ERROR AL CREAR LA RESERVA" });
  }
};

// Actualizar una reserva

ctrlReservas.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    await reserva.update(req.body);
    return res.json({ message: "RESERVA ACTUALIZADA EXITOSAMENTE" });
  } catch (error) {
    console.log("ERROR AL ACTUALIZAR LA RESERVA", error);
    return res.status(500).json({ message: "ERROR AL ACTUALIZAR LA RESERVA" });
  }
};

// Eliminar una reserva de forma lógica

ctrlReservas.eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findByPk(id);
    await reserva.update({ estado: false });
    return reserva.json({ message: "LA RESERVA SE ELIMINO EXITOSAMENTE" });
  } catch (error) {
    console.log("ERROR AL ELIMINAR LA RESERVAS", error);
    return res.status(500).json({ message: "ERROR AL ELIMINAR LA RESERVA" });
  }
};

module.exports = ctrlReservas;

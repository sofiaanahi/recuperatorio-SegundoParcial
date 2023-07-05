// Imports
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();
require("ejs");

const { sequelize } = require("./database");

sequelize
  .authenticate()
  .then(() => console.log("La conexion de base de datos es exitosa"))
  .catch((error) => console.log("Error al conectar a la base de datos", error));

const app = express();
const port = process.env.PORT || 8000;

// TODO: Implementar middlewares

app.use(morgan("dev"));
//app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(require("./routes/reserva.routes"));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

app.use((req, res, next) => {
  return res.status(404).render("404");
});

// Starting the server
app.listen(port, () => console.log(`Server on http://localhost:${port}`));

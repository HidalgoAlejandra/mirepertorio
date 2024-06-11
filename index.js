//npm init --yes
//npm install express
//npm i -g nodemon
//npm i nodemon --D
//nodemon index

//Carga de servidor y definicion de las rutas
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => console.log("Servidor escuchado en puerto 3000"));

//Importando funcion desde el modulo consultas.js
const {
  agregar,
  todos,
  editar,
  eliminar,
} = require("./consultas/consultas.js");
//middleware para recibir desde el front como json
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/cancion", async (req, res) => {
  const { titulo, artista, tono } = req.body;
  try {
    const result = await agregar(titulo, artista, tono);
    console.log("Valor devuelto por la funcion de base de datos: ", result);
    res.json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Error al agregar la cancion" });
  }
});

app.get("/canciones", async (req, res) => {
  try {
    const result = await todos();
    console.log("Respuesta de la funcion todos: ", result);
    res.json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Error al obtener la cancion" });
  }
});

app.put("/cancion/:id", async (req, res) => {
  const { titulo, artista, tono } = req.body;
  const { id } = req.params;
  try {
    const result = await editar(id, titulo, artista, tono);
    console.log("Respuesta de la funcion editar: ", result);
    res.json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Error al editar la cancion" });
  }
});

app.delete("/cancion", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await eliminar(id);
    console.log("Respuesta de la funcion eliminar: ", result);
    res.json(result);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Error al eliminar la cancion" });
  }
});

//npm i pg

const { Pool } = require("pg");

const config = {
  host: "localhost",
  database: "repertorio",
  user: "postgres",
  password: "postgres",
  port: 5432,
};

const pool = new Pool(config);

const agregar = async (titulo, artista, tono) => {
  console.log("Valores recibidos: ", titulo, artista, tono);
  try {
    const result = await pool.query({
      text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *",
      values: [titulo, artista, tono],
    });
    return result.rows[0];
  } catch (err) {
    console.error("Codigo del error: ", err.code);
  }
};

const todos = async () => {
  try {
    const result = await pool.query({
      text: "SELECT * FROM canciones",
    });
    return result.rows;
  } catch (err) {
    console.error("Codigo del error: ", err.code);
  }
};

//funcion para eliminar un registro según su nombre recibido como un query.string
const eliminar = async (id) => {
  try {
    const result = await pool.query({
      text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
      values: [id],
    });
    return result.rows[0];
  } catch (err) {
    console.error("Codigo del error: ", err.code);
  }
};

//funcion para editar un registro
const editar = async (id, titulo, artista, tono) => {
  try {
    const result = await pool.query({
      text: "UPDATE canciones SET titulo = $2, artista = $3, tono =$4 WHERE id = $1 RETURNING *",
      values: [id, titulo, artista, tono],
    });
    return result.rows[0];
  } catch (err) {
    console.error("Codigo del error: ", err.code);
  }
};

module.exports = { agregar, todos, eliminar, editar };

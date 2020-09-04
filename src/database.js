const mysql = require("mysql");
const {promisify}= require('util')
const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    // si se pierde la conexion con la base de datos
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("DATABASE CONNECTION WAS CLOSED");
    }
    // CUANTAS CONEXIONES TIENE HASTA EL MOMENTO
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("DATABASE HAS TO MANY CONNECTIONS");
    }
    //CUANDO LA CONEXION FUE RECHAZADA
    if (err.code === "ECONNREFUSED") {
      console.log("DATABASE CONNECTION WAS REFUSED");
    }
  }
  if (connection) connection.release();
  console.log("DB is connected");
  return;
});
//Promisfy pool Querys
pool.query=promisify(pool.query)
module.exports = pool;

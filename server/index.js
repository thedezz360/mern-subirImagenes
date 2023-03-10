// aca llamamos la configuracion de express, de la base de datos
// y arracamos la aplicacion


//importamos la configuracion de express
// eslint-disable-next-line no-unused-vars
import app from "./app.js";
//importamos la conexion a la base de datos
import { connectDB } from "./db.js";



connectDB();



//VIDEO 41:31
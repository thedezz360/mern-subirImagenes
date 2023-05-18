// aca llamamos la configuracion de express, de la base de datos
// y arracamos la aplicacion

//importamos la configuracion de express
import app from "./app.js";
//importamos la conexion a la base de datos
import { connectDB } from "./db.js";
import { PORT } from "./config.js";

app.listen(PORT);
console.log("running on port ", PORT);

connectDB();



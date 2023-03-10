//importamos el modulo dotenv para utilizar variables de entorno
import dotenv from "dotenv";

//cargamos las variables de entorno
dotenv.config();

export const MONGODB_URI =
	process.env.MONGODB_URI || "mongodb://localhost/testdb";

export const PORT = process.env.PORT || 4000;

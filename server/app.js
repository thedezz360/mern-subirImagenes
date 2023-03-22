//aca tendriamos toda la configuaracion de express

import express from "express";
import fileUpload from "express-fileupload";
//al ser modulo propio hay que poner .js
import postsRoutes from "./routes/posts.routes.js";
import cors from "cors";

//para obtener la ruta absoluta de la carpeta server
import {dirname, join} from "path";
import {fileURLToPath} from "url";

const app = express();

//obtenemos la ruta de la carpeta server
const __dirname = dirname(fileURLToPath(import.meta.url));

//configuramos quien tiene acceso al server
const corsOptions = {
	//origin: "http://127.0.0.1:5173",
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

// Use this after the variable declaration
app.use(cors(corsOptions));


//middlewares
//especificamos que el contenido que recibimos es JSON
app.use(express.json());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "./upload",
	})
);

//routes
app.use(postsRoutes);

//servimos desde el servidor los archivos estaticos generados 
//al hacer el build de la aplicacion
console.log(__dirname);
app.use(express.static(join(__dirname, "../client/dist" )));

export default app;

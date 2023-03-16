//aca tendriamos toda la configuaracion de express

import express from "express";
import fileUpload from "express-fileupload";
//al ser modulo propio hay que poner .js
import postsRoutes from "./routes/posts.routes.js";
import cors from "cors";

const app = express();

//configuramos quien tiene acceso al server
const corsOptions = {
	origin: "http://127.0.0.1:5173",
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

export default app;

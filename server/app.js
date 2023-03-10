//aca tendriamos toda la configuaracion de express

import express from "express";
//al ser modulo propio hay que poner .js
import postsRoutes from "./routes/posts.routes.js";
import { PORT } from "./config.js";


const app = express();
app.use(postsRoutes);
app.listen(PORT);
console.log("running on port ", PORT);

export default app;
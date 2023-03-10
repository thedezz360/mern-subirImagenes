import { Router } from "express";
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	getPost,
} from "../controllers/posts.controllers.js";
const router = Router();

//devulve array con las publicaciones
router.get("/posts", getPosts);
//crea una nueva publicacion
router.post("/posts", createPost);
//actualizamos un post
router.put("/posts", updatePost);
//eliminar publicacion
router.delete("/posts", deletePost);
//devulve solo una publicacion
router.get("/posts/:id", getPost);

export default router;

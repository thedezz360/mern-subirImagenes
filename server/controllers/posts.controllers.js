import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

/**
 * obtener todos los posts
 *
 * @param {*} req
 * @param {*} res
 */

export const getPosts = async (req, res) => {
	try {
		//find es asincrono por lo tanto escribimos await
		const posts = await Post.find();
		return res.send(posts);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

/**
 * crear un post
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createPost = async (req, res) => {
	try {
		//recibimos los valores de la request
		const { title, description } = req.body;
		let image=null;
		console.log("files");
		console.log(req.files);
		
		//comprobamos si se ha emviado una imagen
		if (req.files?.image) {
			
			//guardamos la imagen en cloudinary
			const result = await uploadImage(req.files.image.tempFilePath);
			console.log(result);
			image = {
				url: result.secure_url,
				public_id: result.public_id,
			};

			//eliminamos la imagen temporal del servidor
			await fs.remove(req.files.image.tempFilePath);
		}
		console.log("image");
		console.log(image);

		//creamos el post
		const newPost = new Post({ title, description, image });
		console.log(newPost);
		//guardamos en la base de datos,
		//save es asincrono por lo tanto escribimos await
		await newPost.save();

		return res.json(newPost);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

/**
 * actualizar un post
 * @param {*} req
 * @param {*} res
 */

export const updatePost = async (req, res) => {
	try {
		//devuelve los datos que han sido cambiados
		//const post = await Post.findByIdAndUpdate(req.params.id, req.body);
		//devuelve los datos nuevos
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		return res.send(post);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const deletePost = async (req, res) => {
	const id = req.params.id;

	try {
		const postRemoved = await Post.findByIdAndDelete(id);

		if (!postRemoved) return res.sendStatus(404);
		//comprobamos si la publicacion tiene imagen
		if (postRemoved.image.public_id) {
			console.log(postRemoved);
			//eliminamos la imagen de claudinary
			await deleteImage(postRemoved.image.public_id);
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) return res.sendStatus(404);

		return res.json(post);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

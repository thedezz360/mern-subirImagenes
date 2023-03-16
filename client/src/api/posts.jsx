//desde aca interaccionaremos con la base de datos

import axios from "axios";

const urlServer = "http://localhost:3000";

/**
 * obtenemos todos los post
 * @returns todos los posts
 */
export const getPostRequest = async () => await axios.get(`${urlServer}/posts`);

/**
 * creamos un post
 * @param {*} post post que vamos a guardar en la base de datos
 * @returns respuesta del servidor, como la info del post que hemos creado
 */
export const createPostRequest = async (post) =>
	await axios.post(`${urlServer}/posts`, post);

/**
 * eliminamos un post
 * @param {*} id id del post que se eliminara
 * @returns respuesta del server
 */
export const deletePostRequest = async (id) =>
	await axios.delete(`${urlServer}/posts/${id}`);

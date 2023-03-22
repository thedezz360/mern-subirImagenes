//desde aca interaccionaremos con la base de datos

import axios from "axios";

//const urlServer = "http://localhost:3000";

/**
 * obtenemos todos los post
 * @returns todos los posts
 */
export const getPostsRequest = async () =>
	//await axios.get(`${urlServer}/posts`);
	await axios.get("/posts");
//export const getPostRequest = async () => await axios.get("/post");

/**
 * obtenemos un post mediante su id
 * @param {*} id del post que buscamos
 * @returns el post que pertenece al id
 */
export const getPostRequest = async (id) =>
	//await axios.get(`${urlServer}/posts/${id}`);
	await axios.get(`/posts/${id}`);

/**
 * creamos un post
 * @param {*} post post que vamos a guardar en la base de datos
 * @returns respuesta del servidor, como la info del post que hemos creado
 */
export const createPostRequest = async (post) => {
	//al enviar una imagen se deben enviar los datos en formato form-data y no en json
	//tambien debemos especificar en el header que es form-data
	const form = new FormData(); 
	//transformamos un objeto en formulario
	for(let key in post){
		form.append(key, post[key]);
	}

	// return await axios.post(`${urlServer}/posts`, form, {
	// 	headers:{
	// 		"Content-Type":"multipart/form-data"
	// 	}
	// });

	return await axios.post("/posts", form, {
		headers:{
			"Content-Type":"multipart/form-data"
		}
	});
};

/**
 * eliminamos un post
 * @param {*} id id del post que se eliminara
 * @returns respuesta del server
 */
export const deletePostRequest = async (id) =>
	//await axios.delete(`${urlServer}/posts/${id}`);
	await axios.delete(`/posts/${id}`);

/**
 * actualizamos un post
 * @param {*} id del post que se actualizara
 * @param {*} newFields los valores con los qu se actualizara el post
 */
export const updatePostRequest = async (id, newFields) =>
	//await axios.put(`${urlServer}/posts/${id}`, newFields);
	await axios.put(`/posts/${id}`, newFields);

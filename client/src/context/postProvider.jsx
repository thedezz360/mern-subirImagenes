import React, { useState, useContext, createContext, useEffect } from "react";
import {
	getPostsRequest,
	createPostRequest,
	deletePostRequest,
	getPostRequest,
	updatePostRequest,
} from "../api/posts";
import PropTypes from "prop-types";

//creamos el contexto
const postContext = createContext();

//exportamos el contexto
export const usePost = () => {
	const context = useContext(postContext);
	return context;
};

export const PostProvider = ({ children }) => {
	const [posts, setPosts] = useState([]);

	/**
	 * recuperamos todos los post al cargar el componente
	 */
	useEffect(() => {
		getPosts();
	}, []);

	/**
	 * obtener todos los post
	 */
	const getPosts = async () => {
		const res = await getPostsRequest();
		setPosts(res.data);
	};

	const getPost = async (id) => {
		const res = await getPostRequest(id);
		return res.data;
	};

	/**
	 * crear un post
	 * sera asincrona ya que enviaremos datos al backend
	 */
	const createPost = async (post) => {
		try {
			const res = await createPostRequest(post);
			console.log(res.data);
			//res.data tiene el _id
			setPosts([...posts, res.data]);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * eliminamos un post
	 * @param id id del post a eliminar
	 */
	const deletePost = async (id) => {
		try {
			const res = await deletePostRequest(id);
			console.log(res);
			setPosts(posts.filter((post) => post._id !== id));
			console.log("no error");
		} catch (error) {
			console.log("error");
			console.log(error);
		}
	};

	const updatePost = async (id, newFields) => {
		try {
			const res = await updatePostRequest(id, newFields);
			console.log(res);
			//si coincide actualizamos su valor, si no lo dejamos con el valor anterior
			setPosts(
				posts.map((post) => (post._id === res.data._id ? res.data : post))
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<postContext.Provider
			value={{
				posts,
				setPosts,
				getPosts,
				createPost,
				deletePost,
				getPost,
				updatePost,
			}}
		>
			{children}
		</postContext.Provider>
	);
};

// children any element
PostProvider.propTypes = {
	children: PropTypes.any,
};

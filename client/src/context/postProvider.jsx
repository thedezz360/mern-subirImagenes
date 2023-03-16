import React, { useState, useContext, createContext, useEffect } from "react";
import {
	getPostRequest,
	createPostRequest,
	deletePostRequest,
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
		const res = await getPostRequest();
		console.log(res);
		setPosts(res.data);
	};

	/**
	 * crear un post
	 * sera asincrona ya que enviaremos datos al backend
	 */
	const createPost = async (post) => {
		const res = await createPostRequest(post);
		console.log(res.data);
		//res.data tiene el id
		setPosts([...posts, res.data]);
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

	return (
		<postContext.Provider
			value={{ posts, setPosts, getPosts, createPost, deletePost }}
		>
			{children}
		</postContext.Provider>
	);
};

// children any element
PostProvider.propTypes = {
	children: PropTypes.any,
};

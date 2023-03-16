import React from "react";
//context
import { usePost } from "../context/postProvider";
//icono
import { VscEmptyWindow } from "react-icons/vsc";
//es como una etiqueta "a" pero no refresca la pagina
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

export function HomePage() {
	//recuperamos funciones y variables del context
	const { posts } = usePost();

	//sin no tenemos publicaciones
	if (posts.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center">
				<VscEmptyWindow className="w-48 h-48 text-white" />
				<h1 className="text-white text-2xl">there are not posts</h1>
			</div>
		);
	}

	return (
		<div className="text-white">
			<Link to="/new">Create new post</Link>

			<div className="grid grid-cols-3 gap-2">
				{posts.map((post) => (
					<PostCard post={post} key={post._id} />
				))}
			</div>
		</div>
	);
}

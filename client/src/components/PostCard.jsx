import React from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { usePost } from "../context/postProvider";

export default function PostCard({ post }) {
	const { deletePost } = usePost();

	const handleDelete = (_id) => {
		toast(
			(t) => (
				<div>
					<p className="text-white">
						Do you want to delete? <strong>{_id}</strong>
					</p>
					<div>
						<button
							className="bg-red-400 hover:bg-red-500 px-3 py-2 
						text-white rounded-sm mx-2 text-sm"
							onClick={() => {
								const res = deletePost(_id);
								toast.dismiss(t._id);
								return res;
							}}
						>
							Delete
						</button>

						<button
							className="bg-slate-400 hover:bg-slate-500 px-3 py-2 
						text-white rounded-sm mx-2"
							onClick={() => toast.dismiss(t.id)}
						>
							Cancel
						</button>
					</div>
				</div>
			),
			{
				style: {
					background: "#202020",
				},
			}
		);
	};

	return (
		<div
			className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black
								 hover:bg-zinc-700 hover:cursor-pointer"
		>
			<div className="px-4 py-7">
				<div className="flex justify-between">
					<h3>{post.title}</h3>
					<button
						className="bg-red-600 text-sm px-2 py-1 rounded-sm"
						onClick={() => handleDelete(post._id)}
					>
						Delete
					</button>
				</div>
				<p>{post.description}</p>
			</div>
		</div>
	);
}

PostCard.propTypes = {
	post: PropTypes.object.isRequired,
};

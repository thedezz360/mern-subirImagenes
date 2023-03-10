import mongoose from "mongoose";


//es un simil a crear las tablas en sql
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		url: String,
		public_id: String,
	},
});

export default mongoose.model("Post", postSchema);

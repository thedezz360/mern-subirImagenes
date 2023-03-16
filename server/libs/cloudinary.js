import { v2 as cloudinary } from "cloudinary";

//configuramos cloudinary
cloudinary.config({
	cloud_name: "dwgtwyzgt",
	api_key: "949283479424697",
	api_secret: "k8jKXnbskn8_KU-Ltl_QSThdglo",
});

export async function uploadImage(filePath) {
	return await cloudinary.uploader.upload(filePath, {
		folder: "posts",
	});
}

export async function deleteImage(id) {
	return await cloudinary.uploader.destroy(id);
}

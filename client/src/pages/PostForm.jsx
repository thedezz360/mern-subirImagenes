import React, { useEffect, useState } from "react";
//para crear formularios más rapido, ya que nos ahorramos tener que
//estar validando los campos y demas
import { Formik, Form, Field, ErrorMessage } from "formik";
//importamos el context
import { usePost } from "../context/postProvider";
//"use navigate" es un hook para viajar de forma programada
import { useNavigate, useParams, Link } from "react-router-dom";
//para validaciones
import * as Yup from "yup";
import {AiOutlineLoading} from "react-icons/ai";

export function PostForm() {

	//contexto
	const { createPost, getPost, updatePost } = usePost();

	const [post, setPost] = useState({
		title: "",
		description: "",
		image:null
	});

	//navegacion programada sin refrescar
	const navigate = useNavigate();

	//recoge los parametros de la url,
	//lo usaremos para saber si quiere editar o crear un post
	const params = useParams();

	//se ejecuta cuando carga el componente ,
	//recuperamos los datos de un post
	useEffect(() => {
		//autoejecutamos una funcion anonima
		(async () => {
			//comprobamos si tenemos un parametro en la url
			if (params.id) {
				const data = await getPost(params.id);
				console.log(data);
				setPost(data);
			}
		})();
	}, []);

	return (
		<div className="flex items-center justify-center ">
			<div className="bg-zinc-800 p-10 shadow-sm shadow-black">
				<header className="flex justify-between items-center my-4 text-indigo-600">
					<h3 className="text-xl font-bold">New Post</h3>
					<Link to="/" className="text-gray-400 text-sm hover:text-gray-300 ">
						Go Back
					</Link>
				</header>

				{/*los initial values son como useState */}
				<Formik
					initialValues={post}

					//validacion de los campos del form
					validationSchema={Yup.object({
						title: Yup.string().required("Title is required"),
						description: Yup.string().required("Description is required"),
						
					})}
					onSubmit={async (values,actions) => {

						
						//comprobamos si tenemos un param id ,
						//si es asi actualizamos, si no creamos un post
						if (params.id) {
							await updatePost(params.id, values);
						} else {
							await createPost(values);
						}
						actions.setSubmitting(false);
						navigate("/");

					}}
					//para que cuando cambie el valor de los initialValues,
					//se muestren en pantalla esos cambios
					enableReinitialize={true}
				>
					{/* formik nos devuelve funciones como handleSubmit, 
						pra recuperarlos desestructuramos la respuesta */}

					{({ handleSubmit, setFieldValue, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<label
								htmlFor="title"
								className="text-sm block font-bold text-gray-400"
							>
								Title
							</label>
							<Field
								name="title"
								placeholder="Title"
								className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
							/>
							<ErrorMessage
								name="title"
								component="p"
								className="text-red-400 text-sm"
							/>

							<label
								htmlFor="description"
								className="text-sm block font-bold text-gray-400"
							>
								Description
							</label>
							<Field
								component="textarea"
								rows={3}
								name="description"
								placeholder="Description"
								className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
							/>
							<ErrorMessage
								name="description"
								component="p"
								className="text-red-400 text-sm"
							/>

							<label
								htmlFor="description"
								className="text-sm block font-bold text-gray-400"
							>
								Chose a file
							</label>
							<input 
								type="file" 
								name="image" 
								id="image-upload" 
								className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
								onChange={e => setFieldValue("image",e.target.files[0])}
							/>

							<button
								type="submit"
								className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white 
								focus:outline-none disabled:bg-indigo-400"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<AiOutlineLoading className="animate-spin h-5 w-5"/>
								) : "Save" }
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

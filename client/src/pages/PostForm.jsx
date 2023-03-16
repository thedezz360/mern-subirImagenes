import React from "react";
//para crear formularios más rapido, ya que nos ahorramos tener que
//estar validando los campos y demas
import { Formik, Form, Field, ErrorMessage } from "formik";
//importamos el context
import { usePost } from "../context/postProvider";
//"use navigate" es un hook para viajar de forma programada
import {useNavigate} from "react-router-dom";
//para validaciones
import * as Yup from "yup";

export function PostForm() {

	const {createPost} = usePost();
	const navigate = useNavigate();

	return (
		<>
			{/*los initial values son como useState */}
			<Formik

				initialValues={{
					title: "",
					description: "",
				}}

				//validacion de los campos del form
				validationSchema={Yup.object({
					title: Yup.string().required("Title is required"),
					description: Yup.string().required("Description is required")
				})}

				onSubmit={async(values) =>{
					await createPost(values);
					navigate("/");
				}}
			>

				{/* formik nos devuelve funciones como handleSubmit, 
						pra recuperarlos desestructuramos la respuesta */}

				{({handleSubmit}) => (
					<Form onSubmit={handleSubmit}>

						<Field name="title" placeholder="Title" 
							className="px.3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
						/>
						<ErrorMessage 
							name="title" 
							component="p"
							className="text-red-400 text-sm"
						/>

						<Field name="description" placeholder="Description" 
							className="px.3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
						/>
						<ErrorMessage 
							name="description" 
							component="p"
							className="text-red-400 text-sm"
						/>

						<button type="submit">Save</button>

					</Form>
				)}
			</Formik>
		</>
	);
}

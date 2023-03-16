import { PostForm, HomePage, NotFoundPage } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import React from "react";
//contexto
import { PostProvider } from "./context/postProvider";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div className="bg-neutral-900 min-h-screen flex items-center justify-center">
			<div className="px-10 container">
				<React.StrictMode>
					<PostProvider>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/new" element={<PostForm />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
						<Toaster />
					</PostProvider>
				</React.StrictMode>
			</div>
		</div>
	);
}

export default App;

//video: 3:34

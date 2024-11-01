"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const [processId, setProcessId] = useState<string>("");
	const router = useRouter();

	function onProcessIdChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setProcessId(e.target.value);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (processId.length > 0) router.push(`/process/${processId}`);
		else alert("Digite um código válido.");
	}

	return (
<<<<<<< HEAD
		<div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-purple-700 p-4">
			<header className="text-white text-2xl font-bold mb-4">
				ProcessJur
			</header>

			<main className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
				<h1 className="text-xl font-bold text-center mb-4 text-gray-800">
=======
		<div className="flex flex-col gap-8 row-start-2 items-center justify-center h-full p-12 bg-gradient-to-b from-blue-900 to-purple-800">
			<header className="text-white text-3xl font-bold mb-8">
				ProcessJur
			</header>

			<main className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
				<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
					Pesquise pelo código do seu processo
				</h1>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Digite o código do processo"
							value={processId}
							onChange={onProcessIdChange}
<<<<<<< HEAD
							className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
=======
							className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
						/>
						{/* <FaSearch className="absolute right-3 top-3 text-gray-400" /> */}
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 hover:scale-105 transition-all"
					>
						Buscar processo
					</button>
				</form>
			</main>

			<footer className="mt-8 text-white">
				<a
					href="/login"
					className="text-lg hover:text-gray-200 transition-all rounded-md px-4 py-2 bg-gray-800"
				>
					Login
				</a>
			</footer>
		</div>
	);
}

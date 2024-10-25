"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function Home() {
	const [processId, setProcessId] = useState<string>("");
	const router = useRouter();

	function onProcessIdChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setProcessId(e.target.value);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if(processId.length > 0)
			router.push(`/process/${processId}`);
		else
			alert("Digite um código válido.");
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 p-4">
			<header className="text-white text-3xl font-bold mb-8">
				ProcessJur
			</header>

			<main className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
				<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
					Pesquise pelo código do seu processo
				</h1>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Digite o código do processo"
							value={processId}
							onChange={onProcessIdChange}
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
						/>
						{/*<FaSearch className="absolute right-3 top-3 text-gray-400" />*/}
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
					>
						Buscar processo
					</button>
				</form>
			</main>

			{/* <footer className="mt-12 text-white">
				<a
					href="/login"
					className="text-lg underline hover:text-gray-200 transition-all"
				>
					Logar
				</a>
			</footer> */}
		</div>
	);
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
		<div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-purple-700 p-4">
			<header className="text-white text-2xl font-bold mb-4">
				ProcessJur
			</header>

			<main className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
				<h1 className="text-xl font-bold text-center mb-4 text-gray-800">
					Pesquise pelo código do seu processo
				</h1>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Digite o código do processo"
							value={processId}
							onChange={onProcessIdChange}
							className="w-full p-3 border-2 text-gray-800 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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
				<Link href={"/login"} passHref>
					<div
						className="text-lg hover:text-gray-200 transition-all rounded-md px-4 py-2 bg-gray-800"
					>
						Login
					</div>
				</Link>
				
			</footer>
		</div>
	);
}

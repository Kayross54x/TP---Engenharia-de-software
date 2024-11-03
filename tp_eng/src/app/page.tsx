"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '@/context/UserContext';
import axios from "axios";
import { Process } from "@prisma/client";

export default function Home() {
	const [processId, setProcessId] = useState<string>("");
	const router = useRouter();
	const { userLogged } = useContext(UserContext);
	const [userFavourites, setUserFavourites] = useState<Process[]>([]);

	function onProcessIdChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setProcessId(e.target.value);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (processId.length > 0) router.push(`/process/${processId}`);
		else alert("Digite um código válido.");
	}

	function processRedirect(id: string){
		router.push(`/process/${id}`);
	}

	useEffect(() => {
		if (!userLogged) return;
		axios.get(`/api/userProcess/${userLogged?.id}`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(response => {
				const info: JsonResponse = response.data;
				console.log((info.processList))
				setUserFavourites(info.processList)
			})
			.catch(error => {
				console.error("Erro ao obter o processos favoritados pelo usuário", error);
			});

	}, [userLogged])

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
			{userFavourites.length > 0 && (
					<div className="mt-8 w-full sm:max-w-7xl p-6">
						<h3 className="text-2xl font-bold mb-4">Processos Favoritados</h3>
						<div className="space-y-4">
							{/* Card 1 */}
							{userFavourites.map((item) => (
								<div
                                    className="bg-slate-800 shadow-md rounded-lg p-4 w-full cursor-pointer hover:bg-slate-600 transition-all duration-200"
                                    onClick={() => processRedirect(item.processCode)}
                                >
                                    <p className="font-bold">Código do Processo: {item.processCode}</p>
                                    <p>Nome do Processo: {item.name}</p>
                                    <p>Movimentações: {item.movementCount}</p>
                                    <p>Data da pesquisa: {new Date(item.searchDate).toLocaleDateString() || 'N/A'}</p>
                                </div>
							))}
							
						</div>
					</div>
				)}

		</div>
	);
}

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
				const info = response.data;
				setUserFavourites(info.processList)
			})
			.catch(error => {
				console.error("Erro ao obter o processos favoritados pelo usuário", error);
			});
	}, [userLogged])

	return (
		<div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-purple-700 p-4">
			<header className="text-white text-2xl font-bold mb-4 mt-4">
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
						{userFavourites.map((item) => (
							<div
								key={item.processCode}
								className="bg-slate-800 shadow-md rounded-lg p-5 w-full cursor-pointer hover:bg-slate-700 transition-all duration-200"
								onClick={() => processRedirect(item.processCode)}
							>
								<div className="flex justify-between items-center mb-2">
									<p className="text-lg font-bold flex items-center">
										🔒 Código do Processo: <span className="ml-2 text-slate-300">{item.processCode}</span>
									</p>
									<span className="text-xs text-slate-400">
										📅 {new Date(item.searchDate).toLocaleDateString() || 'N/A'}
									</span>
								</div>
								<div className="text-slate-200 mb-1">
									<span className="font-semibold text-slate-100">📜 Nome do Processo</span>
									<span className="ml-5 text-slate-300">{item.name}</span>
								</div>
								<div className="text-slate-200">
									<span className="font-semibold text-slate-100">🔄 Movimentações </span>
									<span className="ml-5 text-slate-300">{item.movementCount}</span>
								</div>
							</div>
						))}
					</div>
				</div>
				)}
		</div>
	);
}

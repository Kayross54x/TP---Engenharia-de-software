"use client";
import { UserContext } from '@/context/UserContext';
import { Process } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import InputMask from 'react-input-mask';

export default function Home() {
	const [processId, setProcessId] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const router = useRouter();
	const { userLogged } = useContext(UserContext);
	const [userFavourites, setUserFavourites] = useState<Process[]>([]);

	function onProcessIdChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setProcessId(e.target.value);
		setErrorMessage(""); // Limpa a mensagem de erro quando o usuário começa a digitar
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const normalizedId = normalizeProcessId(processId);
		if (normalizedId.length > 0) {
			router.push(`/process/${normalizedId}`);
		} else {
			setErrorMessage("Digite um código válido.");
		}
	}

	function processRedirect(id: string) {
		router.push(`/process/${id}`);
	}

	function normalizeProcessId(id: string) {
		return id.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
	}

	const [greeting, setGreeting] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) {
			setGreeting("Bom dia");
		} else if (hour < 18) {
			setGreeting("Boa tarde");
		} else {
			setGreeting("Boa noite");
		}
	}, []);

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
		<div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#f1f6fa] p-6">
			<header className="text-[#142b3b] text-3xl font-bold mb-6 mt-4 tracking-wide">
				{greeting} {userLogged && userLogged.name ? `, ${userLogged.name.split(' ')[0]}` : ''}
			</header>

			<main className="bg-[#ffffff] border border-[#142b3b] shadow-sm p-8 max-w-md w-full rounded">
				<h1 className="text-xl font-bold text-center mb-6 text-[#142b3b]">
					Pesquise pelo código do seu processo
				</h1>

				<form onSubmit={onSubmit} className="flex flex-col gap-5">
					<div className="relative">
						<InputMask
							mask="9999999-99.9999.9.99.9999" // Exemplo de máscara
							placeholder="Digite o código do processo"
							value={processId}
							onChange={onProcessIdChange}
							className="w-full p-4 border border-[#142b3b] rounded text-[#142b3b] focus:outline-none focus:ring-2 focus:ring-[#2d6084] transition-all" // Bordas em tom de marrom
						/>
						{errorMessage && (
							<p className="mt-2 text-sm text-red-500">{errorMessage}</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full p-3 bg-[#142b3b] text-white rounded border border-[#142b3b] hover:bg-[#2d6084] hover:scale-105 transition-transform duration-150 ease-in-out" // Tom quente para o botão
					>
						Buscar processo
					</button>
				</form>
			</main>

			{userFavourites.length > 0 && (
				<div className="mt-10 w-full sm:max-w-7xl p-6">
					<h3 className="text-2xl font-bold text-[#142b3b] mb-5">Processos Favoritados</h3>
					<div className="space-y-4">
						{userFavourites.map((item) => (
							<div
								key={item.processCode}
								className="bg-[#e2edf5] border border-[#cfe1ee] shadow-sm rounded p-6 w-full cursor-pointer hover:bg-[#cfe1ee] transition-all duration-200" // Usando tons terrosos
								onClick={() => processRedirect(item.processCode)}
							>
								<div className="flex justify-between items-center mb-2">
									<p className="text-lg font-bold text-[#142b3b] flex items-center">
										🔒 Código do Processo: <span className="ml-2 text-[#143b38]">{item.processCode}</span>
									</p>
									<span className="text-xs text-[#143b38]">
										📅 {new Date(item.searchDate).toLocaleDateString() || 'N/A'}
									</span>
								</div>
								<div className="text-[#142b3b] mb-1">
									<span className="font-semibold text-[#142b3b]">📜 Nome do Processo</span>
									<span className="ml-5 text-[#143b38]">{item.name}</span>
								</div>
								<div className="text-[#142b3b]">
									<span className="font-semibold text-[#142b3b]">🔄 Movimentações </span>
									<span className="ml-5 text-[#143b38]">{item.movementCount}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);

}

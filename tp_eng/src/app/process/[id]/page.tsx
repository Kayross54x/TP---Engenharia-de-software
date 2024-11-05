"use client";
import { UserContext } from '@/context/UserContext';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

interface IProcess {
	numeroProcesso?: string;
	classe?: {
		codigo: number;
		nome: string;
	};
	sistema?: {
		codigo: number;
		nome: string;
	};
	formato?: {
		codigo: number;
		nome: string;
	};
	tribunal?: string;
	dataHoraUltimaAtualizacao?: string;
	grau?: string;
	dataAjuizamento?: string;
	movimentos?: Array<{
		codigo: number;
		nome: string;
		dataHora: string;
	}>;
}

interface JsonResponse {
	data: {
		hits: {
			hits: Array<{
				_source: IProcess;
			}>;
		};
	};
}

export default function ProcessPage() {
	const params = useParams();
	const [processNotFound, setProcessNotFound] = useState<boolean>(false);
	const [processInfo, setProcessInfo] = useState<IProcess | null>(null);
	const [showMovimentos, setShowMovimentos] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);

	const { userLogged } = useContext(UserContext);

	useEffect(() => {
		if (typeof params.id !== 'string') return;
		if (!params.id) return;

		getProcessInfo(params.id);
	}, [params]);

	function getProcessInfo(id: string) {
		axios.get(`/api/process/${id}`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(response => {
				const info: JsonResponse = response.data;
				if (info.data.hits.hits[0]?._source) {
					setProcessInfo(info.data.hits.hits[0]._source);
					if (userLogged) {
						getFavoriteInfo(userLogged.id, info.data.hits.hits[0]._source.numeroProcesso || null);
						registerProcess(info.data.hits.hits[0]._source);
					}
				} else {
					setProcessNotFound(true);
				}
			})
			.catch(error => {
				console.error("Erro ao obter o processo", error);
			});
	}

	function getFavoriteInfo(userId: string, processCode: string | null) {
		if (!processCode) return;
		axios.get(`/api/userProcess/${userId}/${processCode}`, {
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(response => {
				const info = response.data;
				if (info.userProcess) {
					setIsFavorited(true);
				}
			})
			.catch(error => {
				setIsFavorited(false);
				if (error.response.status !== 404) console.error("Erro ao obter a relação processo-usuário", error);
			});
	}

	function registerProcess(process: IProcess) {
		const newProcess = {
			movementCount: process.movimentos?.length,
			name: process.classe?.nome,
			processCode: process.numeroProcesso,
		}

		axios.post(`/api/process`, newProcess)
			.then(() => {
				console.log("Processo registrado com sucesso");
			})
			.catch(error => {
				if (error.response.status !== 409) console.log("Erro ao registrar processo", error.response.data.error);
			});
	}

	async function toggleFavorite() {
		if (isFavorited) {
			try {
				const response = await axios.delete(`/api/userProcess/${userLogged?.id}/${processInfo?.numeroProcesso}`, {
					data: { userId: userLogged?.id, processCode: processInfo?.numeroProcesso }
				});

				if (response.data.message) {
					setIsFavorited(!isFavorited);
				}
			} catch (error) {
				console.error("Erro ao deletar o processo:", error);
			}
		}
		else {
			if (!userLogged) return;
			const newUserProcess = {
				userId: userLogged.id,
				processCode: processInfo?.numeroProcesso,
				favouritedDate: new Date()
			}
			axios.post(`/api/userProcess`, newUserProcess)
				.then(() => {
					setIsFavorited(!isFavorited);
				})
				.catch(error => {
					console.error("Erro ao criar relação processo-usuário", error);
				});
		}
	}

	return (
		<div className="min-h-screen flex flex-col bg-[#f1f6fa] p-4">
			<div className="flex items-center mb-5 w-full max-w-4xl mx-auto">
				{/* Seta à esquerda */}
				<Link href="/" passHref className="flex items-center text-[#142b3b] hover:text-[#2d6084] transition duration-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-6 w-6 mr-2"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
					<span className="text-lg font-medium">Voltar à pesquisa de processos</span>
				</Link>
			</div>

			{/* Conteúdo Centralizado */}
			<div className="flex flex-col items-center w-full">
				<header className="text-[#142b3b] text-3xl font-bold mb-8 flex items-center gap-4">
					<span>Detalhes do Processo</span>
					<button onClick={toggleFavorite}>
						{userLogged && (isFavorited ? (
							<span className="text-yellow-400">★</span>
						) : (
							<span className="text-gray-400">☆</span>
						))}
					</button>
				</header>

				<main className="bg-[#e2edf5] rounded-lg shadow-md p-8 max-w-4xl w-full mx-auto border border-[#cfe1ee]">
					{processInfo ? (
						<>
							<h1 className="text-2xl font-bold mb-4 text-[#142b3b]">Processo: {processInfo?.numeroProcesso}</h1>
							<p className="text-[#142b3b] mb-4"><strong>Classe:</strong> {processInfo?.classe?.nome}</p>
							<p className="text-[#142b3b] mb-4"><strong>Tribunal:</strong> {processInfo?.tribunal}</p>
							<p className="text-[#142b3b] mb-4"><strong>Formato:</strong> {processInfo?.formato?.nome}</p>
							<p className="text-[#142b3b] mb-4"><strong>Última Atualização:</strong> {new Date(processInfo?.dataHoraUltimaAtualizacao || "").toLocaleString()}</p>
							<p className="text-[#142b3b] mb-4"><strong>Data de Ajuizamento:</strong> {new Date(processInfo?.dataAjuizamento || "").toLocaleDateString()}</p>

							<h2 className="text-xl font-bold mb-4 text-[#142b3b] cursor-pointer" onClick={() => setShowMovimentos(!showMovimentos)}>
								Movimentos {showMovimentos ? '▼' : '▲'}
							</h2>

							<div
								className={`overflow-hidden transition-all duration-500 ease-in-out ${showMovimentos ? 'max-h-screen' : 'max-h-0'}`}
							>
								<ul className="list-disc pl-5 text-[#142b3b]">
									{processInfo?.movimentos?.map((movimento, index) => (
										<li key={index}>
											<strong>{movimento.nome}:</strong> {new Date(movimento.dataHora).toLocaleString()}
										</li>
									))}
								</ul>
							</div>
							{showMovimentos && (
								<ul className="list-disc pl-5 text-[#142b3b]">
									{processInfo?.movimentos?.map((movimento, index) => (
										<li key={index}>
											<strong>{movimento.nome}:</strong> {new Date(movimento.dataHora).toLocaleString()}
										</li>
									))}
								</ul>
							)}
						</>
					) : (
						<p className={`text-[#142b3b] ${processNotFound ? "text-red-600" : ""}`}>
							{processNotFound ? "Processo não foi encontrado." : "Carregando informações do processo..."}
						</p>
					)}
				</main>
			</div>
		</div>
	);

}
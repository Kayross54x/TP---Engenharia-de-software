"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useLocalStorage from "../../../hooks/useLocalStorage";
import { Process, UserProcess } from '@prisma/client';

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
	const [processInfo, setProcessInfo] = useState<IProcess | undefined>();
	const [showMovimentos, setShowMovimentos] = useState(false); // Estado para controlar a visibilidade dos movimentos

	const [user, setUser] = useState<any>(null);
	const localStorage = useLocalStorage("user");

	useEffect(() => {
		const storedUser = localStorage.getItem();
		setUser(storedUser.userObject);
	}, []);

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
				console.log("processo obtido", info.data.hits.hits[0]?._source);
				if(info.data.hits.hits[0]?._source) {
					setProcessInfo(info.data.hits.hits[0]._source); // Acessando _source
					if(user) {
						registerProcess(info.data.hits.hits[0]._source);
						registerUserProcess(info.data.hits.hits[0]._source);
					}
				} else {
					setProcessNotFound(true);
				}
			})
			.catch(error => {
				console.error("Erro ao obter o processo", error);
			});
	}

	function registerProcess(process: any) {
		const newProcess: Process = {
			movementCount: process.movimentos?.length,
			name: process.classe?.nome,
			processCode: process.numeroProcesso,
		}

		axios.post(`/api/process`, newProcess)
			.then(response => {
				console.log("Processo registrado com sucesso", response);
			})
			.catch(error => {
				console.error("Erro ao registrar processo", error);
			});
	}

	function registerUserProcess(process: any) {
		if(!user) return;
		const newUserProcess: UserProcess = {
			userId: user.id,
			processCode: process.numeroProcesso
		}

		axios.post(`/api/UserProcess`, newUserProcess)
			.then(response => {
				console.log("Relação registrado com sucesso na lista do usuário", response);
			})
			.catch(error => {
				console.error("Erro ao criar relação processo-usuário", error);
			});
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 p-4">
			<header className="text-white text-3xl font-bold mb-8">
				Detalhes do Processo
			</header>

			<main className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
				{processInfo ? (
					<>
						<h1 className="text-2xl font-bold mb-4 text-gray-800">Processo: {processInfo?.numeroProcesso}</h1>
						<p className="text-gray-700 mb-4"><strong>Classe:</strong> {processInfo?.classe?.nome}</p>
						<p className="text-gray-700 mb-4"><strong>Tribunal:</strong> {processInfo?.tribunal}</p>
						<p className="text-gray-700 mb-4"><strong>Formato:</strong> {processInfo?.formato?.nome}</p>
						<p className="text-gray-700 mb-4"><strong>Última Atualização:</strong> {new Date(processInfo?.dataHoraUltimaAtualizacao || "").toLocaleString()}</p>
						<p className="text-gray-700 mb-4"><strong>Data de Ajuizamento:</strong> {new Date(processInfo?.dataAjuizamento || "").toLocaleDateString()}</p>

						<h2 className="text-xl font-bold mb-4 text-gray-800 cursor-pointer" onClick={() => setShowMovimentos(!showMovimentos)}>
							Movimentos {showMovimentos ? '▼' : '▲'}
						</h2>
						{showMovimentos && (
							<ul className="list-disc pl-5 text-gray-700">
								{processInfo?.movimentos?.map((movimento, index) => (
									<li key={index}>
										<strong>{movimento.nome}:</strong> {new Date(movimento.dataHora).toLocaleString()}
									</li>
								))}
							</ul>
						)}
					</>
				) : (
					<p className={`text-gray-700 ${processNotFound ? "text-red-600" : ""}`}>{processNotFound ? "Processo não foi encontrado." : "Carregando informações do processo..."}</p>
				)}
			</main>

			<footer className="mt-12 text-white">
				<a href="/"
					className="text-lg underline hover:text-gray-200 transition-all">
					Voltar para a busca
				</a>
			</footer>
		</div>
	);
}

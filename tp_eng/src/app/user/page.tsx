"use client";
import { UserContext } from '@/context/UserContext';
import { EmailValidator } from '@/models/RegexValidator';
import axios from 'axios';
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';

export default function User() {
	const { userLogged, setUserLogged } = useContext(UserContext);
	const [editLoading, setEditLoading] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [editedUser, setEditedUser] = useState<{ name: string; email: string }>({ name: '', email: '' });
	const emailRegex = new EmailValidator();

	useEffect(() => {
		setEditedUser({ name: userLogged?.name || '', email: userLogged?.email || '' });
	}, [userLogged]);

	function handleEditClick() {
		setIsModalOpen(true);
	}

	function handleModalClose() {
		setIsModalOpen(false);
	}

	function handleSave() {
		if (!userLogged) return;
		if (editedUser.name === "" || editedUser.email === "") {
			alert("Preencha todos os campos corretamente");
			return;
		}

		if (!emailRegex.validEmail(editedUser?.email || '')) {
			alert("Preencha todos os campos corretamente");
			return;
		}

		setEditLoading(true);

		axios.put('/api/user', { ...userLogged, ...editedUser }).then((response) => {
			const { data } = response;
			setUserLogged(data.userObject);
			setEditedUser({ name: data.userObject?.name, email: data.userObject?.email });
			setEditLoading(false);
		}).catch(error => {
			console.error("Erro ao atualizar usuário processo", error);
			setEditedUser({ name: userLogged?.name || '', email: userLogged?.email || '' });
			alert("Erro ao atualizar usuário!");
			setEditLoading(false);
		});

		handleModalClose();
	}

	return (
		<div className="flex flex-col justify-start w-full items-center min-h-[80vh] p-12 bg-[#f1f6fa]">
			<div className="flex items-center mb-5 w-full">
				<Link href="/" passHref className="flex items-center text-[#142b3b] hover:text-[#2d6084] transition duration-300 ml-4">
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

			<div className="rounded w-full p-6 flex flex-col items-center bg-[#e2edf5] border border-[#cfe1ee] shadow-sm">
				<h2 className="text-3xl font-bold text-[#142b3b]">Olá, {userLogged?.name?.split(" ")[0]}</h2>
				<div className="mt-4 p-6 text-[#142b3b]">
					<p><strong className="text-[#142b3b]">Email:</strong> {userLogged?.email || 'Não informado'}</p>
					<p><strong className="text-[#142b3b]">Data de Criação:</strong> {new Date(userLogged?.createdAt || new Date()).toLocaleDateString() || 'N/A'}</p>
					<p><strong className="text-[#142b3b]">Última Atualização:</strong> {new Date(userLogged?.updatedAt || new Date()).toLocaleDateString() || 'N/A'}</p>
				</div>
				<button
					className="mt-4 px-6 py-3 bg-[#142b3b] text-white text-lg rounded hover:bg-[#2d6084] transition duration-300"
					onClick={handleEditClick}
				>
					Editar Usuário
				</button>
			</div>

			{/* Modal de Edição */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-[#e2edf5] rounded p-6 w-96 border border-[#cfe1ee] shadow-sm">
						<h3 className="text-lg font-semibold mb-4 text-[#142b3b]">Editar Perfil</h3>
						<label className="block mb-2">
							<strong className='text-gray-600'>Nome:</strong>
							<input
								type="text"
								value={editedUser.name || ''}
								onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
								className="border border-gray-300 rounded p-2 w-full mt-1 text-black"
							/>
						</label>
						<label className="block mb-4">
							<strong className='text-gray-600'>Email:</strong>
							<input
								type="email"
								value={editedUser.email || ''}
								onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
								className="border border-gray-300 rounded p-2 w-full mt-1 text-black"
							/>
						</label>
						<div className="flex justify-between">
							<button
								className="border-2 border-[#142b3b] text-[#142b3b] py-2 px-4 rounded hover:bg-[#2d6084] hover:text-white transition duration-200"
								onClick={handleModalClose}
							>
								Cancelar
							</button>
							<button
								className="bg-[#142b3b] text-white py-2 px-4 rounded hover:bg-[#2d6084]"
								onClick={handleSave}
							>
								{editLoading ? "Carregando..." : "Salvar"}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="mt-8 w-full sm:max-w-7xl p-6">
				<h3 className="text-2xl font-bold mb-4 text-center text-[#142b3b]">O Trabalho</h3>
				<div className="space-y-4 text-xl text-justify leading-relaxed text-[#142b3b]">
					<p>
						O projeto desenvolvido utiliza <span className="font-bold text-indigo-500">Next.js</span>, <span className="font-bold text-indigo-500">Prisma</span> e <span className="font-bold text-indigo-500">SQLite</span> para construir uma aplicação que permite aos usuários buscar informações sobre processos judiciais.
					</p>
					<p>
						Ao inserir o <span className="font-bold text-indigo-500">código de um processo</span>, o sistema se conecta à <span className="font-bold text-indigo-500">API do DataJus</span> para recuperar e exibir dados relevantes sobre aquele caso.
					</p>
					<p>
						A plataforma é <span className="font-bold text-indigo-500">simples</span> e <span className="font-bold text-indigo-500">intuitiva</span>, permitindo acesso rápido às informações dos processos, oferecendo uma experiência direta e eficiente ao usuário.
					</p>
				</div>
			</div>
		</div>
	);
}

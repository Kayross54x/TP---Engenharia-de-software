"use client";
import { useRouter } from 'next/navigation';
import useLocalStorage from '../../hooks/useLocalStorage';
import React, { useEffect, useState } from 'react';

export default function User() {
	const [user, setUser] = useState<any>(null);
	const localStorage = useLocalStorage("user");
	const navigate = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editedUser, setEditedUser] = useState<{ name?: string; email?: string }>({});

	useEffect(() => {
		const storedUser = localStorage.getItem();
		setUser(storedUser.userObject);
	}, []);

	function processRedirect(processCode: string) {
		navigate.push(`/process/${processCode}`);
	}

	function handleEditClick() {
		setEditedUser({ name: user?.name, email: user?.email });
		setIsModalOpen(true);
	}

	function handleModalClose() {
		setIsModalOpen(false);
	}

	function handleSave() {
		// Aqui você pode adicionar a lógica para salvar as alterações no usuário
		// Por enquanto, vamos apenas fechar o modal
		handleModalClose();
	}

	return (
		<div className="flex flex-col justify-center items-center h-full p-12 bg-gradient-to-b from-blue-900 to-purple-800">
			<div className="rounded-lg w-full p-6 flex flex-col items-center justify-between">
				<h2 className="text-6xl font-bold">Olá, {user?.name.split(" ")[0]}</h2>
				<div className="mt-4 p-6">
					<p><strong>Email:</strong> {user?.email || 'Não informado'}</p>
					<p><strong>Data de Criação:</strong> {new Date(user?.createdAt).toLocaleDateString() || 'N/A'}</p>
					<p><strong>Última Atualização:</strong> {new Date(user?.updatedAt).toLocaleDateString() || 'N/A'}</p>
				</div>
				<button 
					className="mt-4 p-4 bg-blue-600 text-white text-xl py-2 rounded hover:bg-blue-700 transition duration-300"
					onClick={handleEditClick}
				>
					Editar Usuário
				</button>
			</div>

			{/* Modal de Edição */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg p-6 w-96">
						<h3 className="text-lg font-semibold mb-4 text-gray-600">Editar Perfil</h3>
						<label className="block mb-2">
							<strong className='text-gray-600'>Nome:</strong>
							<input 
								type="text" 
								value={editedUser.name || ''} 
								onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} 
								className="border border-gray-300 rounded p-2 w-full mt-1"
							/>
						</label>
						<label className="block mb-4">
							<strong className='text-gray-600'>Email:</strong>
							<input 
								type="email" 
								value={editedUser.email || ''} 
								onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} 
								className="border border-gray-300 rounded p-2 w-full mt-1"
							/>
						</label>
						<div className="flex justify-between">
							<button 
								className={`border-2 border-gray-600 text-gray-600 hover:text-white py-2 px-4 rounded hover:bg-red-700` }
								onClick={handleModalClose}
							>
								Cancelar
							</button>
							<button 
								className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" 
								onClick={handleSave}
							>
								Salvar
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="mt-8 w-full sm:max-w-7xl p-6">
				<h3 className="text-2xl font-bold mb-4">Processos pesquisados</h3>
				<div className="space-y-4">
					{/* Card 1 */}
					<div 
						className="bg-slate-800 shadow-md rounded-lg p-4 w-full cursor-pointer hover:bg-slate-600 transition-all duration-200" 
						onClick={() => processRedirect("1234")}
					>
						<p className="font-bold">Código do Processo: 001</p>
						<p>Nome do Processo: Exemplo de Processo 1</p>
						<p>Movimentações: 3</p>
						<p>Data da pesquisa: {new Date().toLocaleDateString() || 'N/A'}</p>
					</div>
					{/* Card 2 */}
					<div 
						className="bg-slate-800 shadow-md rounded-lg p-4 w-full cursor-pointer hover:bg-slate-600 transition-all duration-200" 
						onClick={() => processRedirect("1234")}
					>
						<p className="font-bold">Código do Processo: 002</p>
						<p>Nome do Processo: Exemplo de Processo 2</p>
						<p>Movimentações: 5</p>
						<p>Data da pesquisa: {new Date().toLocaleDateString() || 'N/A'}</p>
					</div>
					{/* Card 3 */}
					<div 
						className="bg-slate-800 shadow-md rounded-lg p-4 w-full cursor-pointer hover:bg-slate-600 transition-all duration-200" 
						onClick={() => processRedirect("1234")}
					>
						<p className="font-bold">Código do Processo: 003</p>
						<p>Nome do Processo: Exemplo de Processo 3</p>
						<p>Movimentações: 2</p>
						<p>Data da pesquisa: {new Date().toLocaleDateString() || 'N/A'}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

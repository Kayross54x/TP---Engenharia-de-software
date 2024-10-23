"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [processId, setProcessId] = useState<string>("");

	function onProcessIdChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setProcessId(e.target.value);
	}

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		// Fazendo a requisição para a rota de API
		const userId = "ec431674-d709-4bb6-a9be-7173d0da3801";
		const response = await fetch(`/api/user/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const data = await response.json();
			console.log("processo adicionado ao usuario", data)
		} else {
			console.error("Erro ao salvar processo");
		}
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			

			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
					<li className="mb-2">
						Pesquise pelo código do seu processo...
					</li>

					<form onSubmit={onSubmit}>
						<div className="flex flex-col items-end justify-center">
							<input
								type="text"
								value={processId}
								onChange={onProcessIdChange}
								className="rounded p-2 border border-gray-300 w-full text-purple-500 focus:outline-purple-500"
							/>
							{/* <p>Process ID: {processId}</p> */}
							<button type="submit" className="mt-2 rounded bg-purple-500 p-2 hover:bg-purple-400 transition-all">Buscar processo</button>
						</div>

					</form>


					{/* <li className="mb-2">
					<pre>{JSON.stringify(users, null, 2)}</pre>
				</li> */}
				</ol>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							className="dark:invert"
							src="https://nextjs.org/icons/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Deploy now
					</a>
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read our docs
					</a>
				</div>
			</main>

			
		</div>
	);
}

"use client";

import { useState } from "react";

export default function LoginClientSide() {
    const [email, setLogin] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    function onUsernameOrEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setLogin(e.target.value);
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSenha(e.target.value);
    }

    async function onLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // console.log(email, senha);

        //Fazendo a requisição de login para a rota de API
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, senha: senha }),
        });

        console.log(response);

        if (response.status == 200) {
            const data = await response.json();
            console.log("Usuário logado", data);
        } else if (response.status == 400) {
            console.error("Senha ou email incorretos");
        } else {
            console.error("Erro ao logar");
        }


    }

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    Bem vindos ao ProcessJur
                </li>

                <li className="mb-2">
                    Insira seu email e senha para acessar sua conta
                </li>

                <form onSubmit={onLoginSubmit}>
                    <div className="flex flex-col items-end justify-center w-full">
                        <input
                            type="text"
                            placeholder="Email or Username"
                            value={email}
                            onChange={onUsernameOrEmailChange}
                            className="rounded p-2 border border-gray-300 w-full text-purple-500 focus:outline-purple-500 mb-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={senha}
                            onChange={onPasswordChange}
                            className="rounded p-2 border border-gray-300 w-full text-purple-500 focus:outline-purple-500"
                        />
                        <button type="submit" className="mt-4 rounded bg-purple-500 p-2 hover:bg-purple-400 transition-all w-full">
                            Entrar
                        </button>
                    </div>
                </form>

                <div className="mt-4 flex flex-col items-center w-full sm:flex-row sm:justify-between">


                    <button className="rounded bg-gray-200 border border-gray-300 p-2 text-sm text-purple-500 hover:bg-gray-300 hover:border-gray-400 transition-all w-full sm:w-auto">
                        Criar uma conta
                    </button>

                    <a href="#" className="text-sm text-purple-500 hover:underline mb-4 sm:mb-0 sm:mr-2">Esqueceu sua senha?</a>
                </div>
            </ol>
        </main>


    );
}
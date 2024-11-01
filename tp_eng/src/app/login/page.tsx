"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setLogin] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const user = useLocalStorage("user");
    const router = useRouter();

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

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, senha: senha }),
        });

        if (response.status === 200) {
            const data = await response.json();
            user.setItem(data);
            router.push("/user");
        } else if (response.status === 400) {
            console.error("Senha ou email incorretos");
        } else {
            console.error("Erro ao logar");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Bem-vindo ao ProcessJur
                </h1>

                <form onSubmit={onLoginSubmit} className="flex flex-col gap-4">
                    <label className="text-gray-700 font-semibold">
                        Insira seu email
                    </label>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={onUsernameOrEmailChange}
                        className="rounded p-3 border border-gray-300 w-full text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all mb-4"
                    />

                    <label className="text-gray-700 font-semibold">
                        Insira sua senha
                    </label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={onPasswordChange}
                        className="rounded p-3 border border-gray-300 w-full text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all mb-4"
                    />

                    <button
                        type="submit"
                        className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-4 flex flex-col items-center w-full sm:flex-row sm:justify-between">
                    <Link href="/register" passHref>
                        <button className="rounded bg-gray-200 border border-gray-300 p-2 text-sm text-purple-500 hover:bg-gray-300 hover:border-gray-400 transition-all w-full sm:w-auto mb-2 sm:mb-0">
                            Criar uma conta
                        </button>
                    </Link>
                    
                    <Link href="/forgot-password">
                        <p className="text-sm text-purple-500 hover:underline">
                            Esqueceu sua senha?
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

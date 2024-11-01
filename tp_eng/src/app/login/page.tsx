"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setSenha] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { setUserLogged } = useContext(UserContext);
    const router = useRouter();

    function onUsernameOrEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSenha(e.target.value);
    }

    const validEmail = (email: string) => (
        email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    )

    function formValid() {
        let valid: boolean = true;
        setEmailError("");
        setPasswordError("");

        if (password == "") { setPasswordError("Insira uma senha."); valid = false }
        if (email == "") { setEmailError("Insira um email."); valid = false };

        if (!validEmail(email)) {
            setEmailError("Insira um email válido.");
            valid = false;
        }

        return valid;
    }

    async function onLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

<<<<<<< HEAD
=======
        if (!formValid()) {setLoading(false); return};

        //Fazendo a requisição de login para a rota de API
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, senha: password }),
        });

<<<<<<< HEAD
        if (response.status === 200) {
            const data = await response.json();
            user.setItem(data);
            router.push("/user");
        } else if (response.status === 400) {
            console.error("Senha ou email incorretos");
=======
        if (response.status == 200) {
            const data = await response.json();
            setUserLogged(data.userObject)
            setLoading(false);
            router.push("/user");
        } else if (response.status == 400) {
            alert("Senha ou email incorretos! Usuário não existe no sistema");
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
        } else {
            alert("Erro ao logar!");
        }

        setLoading(false);
    }

    return (
<<<<<<< HEAD
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
=======
        <div className="flex gap-8 row-start-2 items-start justify-center h-full p-12 bg-gradient-to-b from-blue-900 to-purple-800">
            <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-12 font-bold text-5xl">
                    Bem vindos ao ProcessJur
                </li>

                <form onSubmit={onLoginSubmit}>
                    <div className="flex flex-col justify-center w-full">
                        <li className="mb-2">
                            Insira seu email
                        </li>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={onUsernameOrEmailChange}
                            className={`rounded p-2 border-2 w-full text-purple-500 focus:outline-purple-500 
                                        ${emailError ? "placeholder-red-600 border-red-600" : "placeholder-gray-300 border-gray-300"}`}
                        />
                        {emailError && (
                            <span className="ml-1 text-red-600">{emailError}</span>
                        )}


                        <li className="mb-2 mt-4">
                            Insira sua senha
                        </li>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={onPasswordChange}
                            className={`rounded p-2 border-2 w-full text-purple-500 focus:outline-purple-500 
                                ${passwordError ? "placeholder-red-600 border-red-600" : "placeholder-gray-300 border-gray-300"}`}
                        />
                        {passwordError && (
                            <span className="ml-1 text-red-600">{passwordError}</span>
                        )}
                        <button type="submit" disabled={loading} className="mt-4 rounded bg-purple-500 p-2 hover:bg-purple-400 transition-all w-full">
                            {loading ? "Carregando..." : "Entrar"}
                        </button>
                    </div>
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
                </form>

                <div className="mt-4 flex flex-col items-center w-full sm:flex-row sm:justify-between">
                    <Link href="/register" passHref>
<<<<<<< HEAD
                        <button className="rounded bg-gray-200 border border-gray-300 p-2 text-sm text-purple-500 hover:bg-gray-300 hover:border-gray-400 transition-all w-full sm:w-auto mb-2 sm:mb-0">
                            Criar uma conta
                        </button>
                    </Link>
                    
                    <Link href="/forgot-password">
                        <p className="text-sm text-purple-500 hover:underline">
                            Esqueceu sua senha?
                        </p>
=======
                        <button className="rounded mb-2 bg-gray-200 border border-gray-300 p-2 text-sm text-purple-500 hover:bg-gray-300 hover:border-gray-400 transition-all w-full sm:w-auto">
                            Criar uma conta
                        </button>
                    </Link>

                    <Link href="/forgot-password">
                        <p className="text-sm text-purple-500 hover:underline mb-4 sm:mb-0 sm:mr-2">Esqueceu sua senha?</p>
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589
                    </Link>
                </div>
            </div>
        </div>
    );
}

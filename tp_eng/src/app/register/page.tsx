"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import { EmailValidator } from "@/models/RegexValidator";

export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setSenha] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);
    const [nameError, setNameError] = useState<string>("");
    const [termsError, setTermsError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const emailRegex = new EmailValidator();

    const { setUserLogged } = useContext(UserContext);
    const router = useRouter();

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTerms(e.target.checked);
        setTermsError(false);
    }

    function onConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setConfirmPassword(e.target.value);
    }

    function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setName(e.target.value);
    }

    function onUsernameOrEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setSenha(e.target.value);
    }

    function formValid() {
        let valid: boolean = true;
        setEmailError("");
        setPasswordError("");
        setNameError("");
        setConfirmPasswordError("");
        setTermsError(false);

        if (name == "") { setNameError("Insira um nome."); valid = false }
        if (password == "") { setPasswordError("Insira uma senha."); valid = false }
        if (confirmPassword == "") { setConfirmPasswordError("Insira uma senha."); valid = false }
        if (email == "") { setEmailError("Insira um email."); valid = false };
        if (!terms) { setTermsError(true); valid = false; }

        if (password !== confirmPassword) {
            setPasswordError("As senhas não coincidem.");
            setConfirmPasswordError("As senhas não coincidem.");
            valid = false;
        }

        if (!emailRegex.validEmail(email)) { setEmailError("Insira um email válido."); valid = false; }

        return valid;
    }

    async function onRegisterSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        if (!formValid()) { setLoading(false); return };

        const newUser = {
            email: email,
            password: password,
            name: name,
            createdAt: new Date(),
        }
        
        const response = await fetch("/api/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (response.status == 200) {
            const data = await response.json();
            setUserLogged(data.userObject)
            setLoading(false);
            router.push("/user");
        } else if (response.status == 400) {
            alert("Erro ao realizar cadastro de usuário");
        } else {
            alert("Erro ao cadastrar!");
        }

        setLoading(false);
    }

    return (
        <div className="flex gap-8 row-start-2 items-start justify-center h-full p-12 bg-gradient-to-b from-blue-900 to-purple-800">
            <ol className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-12 font-bold text-5xl">
                    Bem vindos ao ProcessJur
                </li>

                <form onSubmit={onRegisterSubmit}>
                    <div className="flex flex-col justify-center w-full">
                        <li className="mb-2">
                            Insira seu nome
                        </li>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={onChangeName}
                            className={`rounded p-2 border-2 w-full text-purple-500 focus:outline-purple-500 
                                        ${nameError ? "placeholder-red-600 border-red-600" : "placeholder-gray-300 border-gray-300"}`}
                        />
                        {nameError && (
                            <span className="ml-1 text-red-600">{nameError}</span>
                        )}

                        <li className="mb-2 mt-4">
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

                        <li className="mb-2 mt-4">
                            Confirme sua senha
                        </li>
                        <input
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmPassword}
                            onChange={onConfirmPasswordChange}
                            className={`rounded p-2 border-2 w-full text-purple-500 focus:outline-purple-500 
                                ${confirmPasswordError ? "placeholder-red-600 border-red-600" : "placeholder-gray-300 border-gray-300"}`}
                        />
                        {confirmPasswordError && (
                            <span className="ml-1 text-red-600">{confirmPasswordError}</span>
                        )}

                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={handleCheckboxChange}
                                className={`w-5 h-5 appearance-none border-2 cursor-pointer
                                ${termsError ? 'border-red-600' : 'border-gray-300'}
                                rounded-none
                                focus:outline-purple-500
                                checked:bg-purple-500
                                `}
                            />
                            <label className={`ml-2 ${termsError ? 'text-red-600' : ''}`}>
                                Você concorda com os termos de uso e de privacidade
                            </label>
                        </div>

                        <button type="submit" disabled={loading} className="mt-8 rounded bg-purple-500 p-2 hover:bg-purple-400 transition-all w-full">
                            {loading ? "Carregando..." : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </ol>
        </div>


    );
}
"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Header() {
    const navigate = useRouter();
    const { userLogged, setUserLogged } = useContext(UserContext);

    function onLoggout() {
        setUserLogged(null);
        navigate.push("/login");
    }

    return (
        <header className="flex justify-between items-center p-6 bg-gray-900 text-white shadow-lg h-[10vh]">
            <Link href="/" passHref className="flex items-center">
                <img src="/images/logo_branca-removebg-preview.png" alt="Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-2xl font-semibold tracking-wide text-white">ProcessJur</h1>
            </Link>

            <div>
                {userLogged ? (
                    <div className="flex items-center space-x-2 max-w-xs">
                        <Link href="/user" passHref>
                            <div className="flex items-center justify-center w-12 h-12 bg-[#285676] text-white font-medium rounded-full hover:bg-[#142b3b]">
                                {userLogged?.name?.charAt(0).toUpperCase()}
                            </div>
                        </Link>
                        <button
                            onClick={() => onLoggout()}
                            className="rounded bg-[#285676] text-white px-4 py-1 hover:bg-[#142b3b] transition duration-300 ease-in-out shadow-md"
                        >
                            Sair
                        </button>
                    </div>
                ) : (
                    <Link href="/login" passHref>
                        <button
                            className="rounded bg-[#285676] text-white px-4 py-1 hover:bg-[#142b3b] transition duration-300 ease-in-out shadow-md"
                        >
                            Logar
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
}    

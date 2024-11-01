"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Header() {
	const navigate = useRouter();
    const { userLogged, setUserLogged } = useContext(UserContext);

	function onLoggout() {
		setUserLogged(null);
		navigate.push("/");
	}

    return (
        <header className="block sm:flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link href="/" passHref className="flex items-center justify-center sm:justify-start sm:items-start">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">ProcessJur</h1>
            </Link>

            <div>
                {userLogged ? (
                    <div className="flex items-center justify-center">
                        <Link href="/user" passHref>
                            <div>{userLogged?.name}</div>
                        </Link>

						<button onClick={() => onLoggout()} className="ml-4 rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-9 px-4">
							Sair
						</button>
                    </div>
                ) : (
                    <Link href="/login" passHref>
                        <button className="rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-8 sm:h-9 px-4">
                            Logar
                        </button>
                    </Link>
                )}
            </div>
        </header>
    );
}

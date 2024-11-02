"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Footer() {
    const { userLogged } = useContext(UserContext);

    return (
        <footer className="block sm:flex justify-between items-center p-4 bg-gray-800 text-white mt-0">
            <div className="flex items-center justify-center sm:justify-start sm:items-start">
                <span>&copy; 2024 ProcessJur. Todos os direitos reservados.</span>
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-8 mt-4 sm:mt-0">
                <div className="flex space-x-4">
                    <span>Alex</span>
                    <a href="/* LinkedIn link do Alex */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/* GitHub link do Alex */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Rubens</span>
                    <a href="/* LinkedIn link do Rubens */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/* GitHub link do Rubens */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Mateus</span>
                    <a href="/* LinkedIn link do Mateus */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/* GitHub link do Mateus */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Kayque</span>
                    <a href="/* LinkedIn link do Kayque */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="/* GitHub link do Kayque */" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </div>

            {userLogged && (
                <div className="flex items-center justify-center sm:justify-end sm:ml-4 mt-4 sm:mt-0">
                    <Link href="/user" passHref>
                        <div>{userLogged?.name}</div>
                    </Link>
                </div>
            )}
        </footer>
    );
}

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
                    <a href="https://www.linkedin.com/in/alex-eduardo/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/AlexEduardo-zip" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Rubens</span>
                    <a href="https://www.linkedin.com/in/rubens-castro-382ba6219/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/RCastro13" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Mateus</span>
                    <a href="https://www.linkedin.com/in/mateus-augusto-53b2a5314/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Mateusg2022" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="flex space-x-4">
                    <span>Kayque</span>
                    <a href="https://www.linkedin.com/in/kayque-siqueira-ba8a34230/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Kayross54x" target="_blank" rel="noopener noreferrer">
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

"use client";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Footer() {
    const { userLogged } = useContext(UserContext);

    return (
        <footer className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-900 text-white shadow-inner h-[10vh]">
            <div className="flex items-center md:mb-0 mb-4 text-center">
                <span>&copy; 2024 ProcessJur. Todos os direitos reservados.</span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-8">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <span className="font-semibold">Alex</span>
                    <a href="https://www.linkedin.com/in/alex-eduardo/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin text-blue-500 hover:text-blue-400"></i>
                    </a>
                    <a href="https://github.com/AlexEduardo-zip" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github text-gray-500 hover:text-gray-400"></i>
                    </a>
                </div>
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <span className="font-semibold">Rubens</span>
                    <a href="https://www.linkedin.com/in/rubens-castro-382ba6219/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin text-blue-500 hover:text-blue-400"></i>
                    </a>
                    <a href="https://github.com/RCastro13" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github text-gray-500 hover:text-gray-400"></i>
                    </a>
                </div>
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <span className="font-semibold">Mateus</span>
                    <a href="https://www.linkedin.com/in/mateus-augusto-53b2a5314/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin text-blue-500 hover:text-blue-400"></i>
                    </a>
                    <a href="https://github.com/Mateusg2022" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github text-gray-500 hover:text-gray-400"></i>
                    </a>
                </div>
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <span className="font-semibold">Kayque</span>
                    <a href="https://www.linkedin.com/in/kayque-siqueira-ba8a34230/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin text-blue-500 hover:text-blue-400"></i>
                    </a>
                    <a href="https://github.com/Kayross54x" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github text-gray-500 hover:text-gray-400"></i>
                    </a>
                </div>
            </div>

            {/* {userLogged && (
                <div className="flex items-center mt-4 md:mt-0">
                    <Link href="/user" passHref>
                        <div className="text-sm font-semibold text-gray-200 hover:text-gray-400">{userLogged?.name}</div>
                    </Link>
                </div>
            )} */}
        </footer>
    );

}

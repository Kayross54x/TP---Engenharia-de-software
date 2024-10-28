"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '@/context/UserContext';

export default function Header() {
	const { userLogged } = useContext(UserContext);

	return (
		<header className="flex justify-between items-center p-4 bg-gray-800 text-white">
			<Link href="/" passHref>
				<h1 className="text-3xl font-bold">ProcessJur</h1>
			</Link>

			<div>
				{userLogged ? (
					<Link href="/user" passHref>
						<div>{userLogged.name}</div>
					</Link>
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

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Header() {
	const [user, setUser] = useState<any>(null);
	const localStorage = useLocalStorage("user");

	useEffect(() => {
		const storedUser = localStorage.getItem();
		setUser(storedUser.userObject);
	}, []);

	return (
		<header className="flex justify-between items-center p-4 bg-gray-800 text-white">
			<Link href="/" passHref>
				<h1 className="text-3xl font-bold">ProcessJur</h1>
			</Link>

			<div>
				{user ? (
					<Link href="/user" passHref>
						<div>{user.name}</div>
					</Link>
				) : (
					<Link href="/login" passHref>
						<button className="rounded border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
							Logar
						</button>
					</Link>
				)}
			</div>
		</header>
	);
}

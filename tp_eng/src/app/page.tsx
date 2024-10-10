import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import UserSearch from "@/pages/home";

export default async function Home() {
	const users: User[] = await prisma.user.findMany();

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<header>
				<h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>
			</header>

			<UserSearch users={users} />

			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="https://nextjs.org/icons/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const userInfo = await req.json();

    const user = await prisma.user.create({ data: userInfo });

    if (user) {
		const userObject = {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt
        }
        return NextResponse.json({ userObject });
    } else {
        return NextResponse.json({ error: "Erro ao criar usuário." }, { status: 400 });
    }
}
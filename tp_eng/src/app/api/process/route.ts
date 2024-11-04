import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const processInfo = await req.json();

    try {
        const process = await prisma.process.create({ data: processInfo });
        return NextResponse.json({ process });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            //se entrar aqui, é porque o processo já existe na base de dados
            return NextResponse.json(
                { error: "Este processo já existe na base de dados." },
                { status: 409 }
            );
        } else {
            return NextResponse.json(
                { error: "Erro ao cadastrar processo na base de dados." },
                { status: 500 }
            );
        }
    }
}
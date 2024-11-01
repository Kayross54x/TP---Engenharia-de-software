import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const processInfo = await req.json();
    console.log("ANTES", processInfo);

    const process = await prisma.process.create({ data: processInfo });
    //Verificar se a senha está correta
    if (process) {
		console.log("DEPOIS", process);
        return NextResponse.json({ process });
    } else {
        return NextResponse.json({ error: "Erro ao cadastrar processo na base de dados." }, { status: 400 });
    }
}
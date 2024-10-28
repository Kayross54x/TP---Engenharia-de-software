import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const processInfo = await req.json();
    console.log("ANTES", processInfo);

    const userProcess = await prisma.userProcess.create({ data: processInfo });
	
    if (userProcess) {
		console.log("DEPOIS", userProcess);
        return NextResponse.json({ userProcess });
    } else {
        return NextResponse.json({ error: "Erro ao registrar o processo na lista do usuário." }, { status: 400 });
    }
}
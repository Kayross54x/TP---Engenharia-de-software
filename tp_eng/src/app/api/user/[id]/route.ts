import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const id = request.url.split("/").pop();

    if (!id) {
        return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    //fazer a requisição com o fetch pro jus passando o processId

    // aqui você retorna o processo depois de cadastrar no banco
    return NextResponse.json({ user });
}

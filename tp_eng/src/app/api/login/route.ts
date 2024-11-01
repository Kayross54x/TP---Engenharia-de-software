import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { senha, email } = await req.json();
    console.log("adawdawdawdawd",senha, email);

    //Fazer uma requisição pra tebelas de usuario e senha
    const user = await prisma.user.findUnique({ where: { email } });

    console.log(user);
    //Procurar o usuario pelo emnail no banco de dados

    //Verificar se a senha está correta
    if (user?.password === senha) {
        return NextResponse.json({ user });
    } else {
        return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }
}
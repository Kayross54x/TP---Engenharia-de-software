import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { senha, email } = await req.json();
<<<<<<< HEAD
    console.log("adawdawdawdawd",senha, email);
=======
>>>>>>> 11442fc755582df8ac5c60b4adde0d528680e589

    //Fazer uma requisição pra tebelas de usuario e senha
    const user = await prisma.user.findUnique({ where: { email } });
    //Procurar o usuario pelo emnail no banco de dados

    //Verificar se a senha está correta
    if (user?.password === senha) {
        const userObject = {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt
        }
        return NextResponse.json({ userObject });
    } else {
        return NextResponse.json({ error: "Senha incorreta" }, { status: 400 });
    }
}
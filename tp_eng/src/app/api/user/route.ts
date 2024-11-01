import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const userParameter = await req.json();
	const { id, email, name } = userParameter;

	const userObject = await prisma.user.update({
		where: {
			id: id,  // Localiza o usuário pelo ID
		},
		data: {
			email: email,  // Atualiza o email
			name: name,    // Atualiza o nome
		},
	});

    if (userObject) {
        return NextResponse.json({ userObject });
    } else {
        return NextResponse.json({ error: "Erro ao atualizar usuário na base de dados." }, { status: 400 });
    }
}
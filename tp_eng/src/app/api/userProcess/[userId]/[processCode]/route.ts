import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { userId: string, processCode: string } }) {
    const { userId, processCode } = params;
    try {
        const userProcess = await prisma.userProcess.findFirst({
            where: {
				AND: [
					{ userId: userId },
					{ processCode: processCode },
				]
			},
        });

        if (userProcess) {
            return NextResponse.json({ userProcess });
        } else {
            return NextResponse.json({ error: "Processo não encontrado." }, { status: 404 });
        }
    } catch (error) {
        console.error("Erro ao buscar o processo:", error);
        return NextResponse.json({ error: "Erro ao buscar o processo." }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { userId, processCode } = await req.json();

    if (!userId || !processCode) {
        return NextResponse.json({ error: "userId e processCode são obrigatórios." }, { status: 400 });
    }

    try {
        // Primeiro, buscar o processo que será deletado
        const userProcess = await prisma.userProcess.findFirst({
            where: {
                userId: userId,
                processCode: processCode,
            },
        });

        console.log("Achoui", userProcess)

        // Se o processo não for encontrado, retorna um erro
        if (!userProcess) {
            return NextResponse.json({ error: "Processo não encontrado." }, { status: 404 });
        }

        // Depois, realizar a deleção
        const deletedProcess = await prisma.userProcess.delete({
            where: {
                id: userProcess.id, // Usar o id do processo encontrado
            },
        });

        return NextResponse.json({ message: "Processo deletado com sucesso.", deletedProcess });
    } catch (error) {
        console.error("Erro ao deletar o processo:", error);
        return NextResponse.json({ error: "Erro ao deletar o processo." }, { status: 500 });
    }
}
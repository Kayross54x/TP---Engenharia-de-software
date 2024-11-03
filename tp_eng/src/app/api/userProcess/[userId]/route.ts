import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;
    try {
        const userProcess = await prisma.userProcess.findMany({
            where: {
                userId: userId
            },
        });

        const processList = await Promise.all(userProcess.map(async (item) => {
            return await prisma.process.findUnique({
                where: {
                    processCode: item.processCode,
                },
            });
        }));

        return NextResponse.json({ processList });

    } catch (error) {
        console.error("Erro ao buscar o processo:", error);
        return NextResponse.json({ error: "Erro ao buscar o processo." }, { status: 500 });
    }
}

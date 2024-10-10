// app/api/processId/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { processId } = await req.json();
  console.log(processId);

  //fazer a requisicao com o fetch pro jus passando o processId

  //ai aqui eu retorno o processo depois de cadastrar ele no banco na
  //tabela de ralcao do usuario
  return NextResponse.json({ processId });
}
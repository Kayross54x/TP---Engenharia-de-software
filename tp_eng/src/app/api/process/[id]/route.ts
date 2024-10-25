import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const id = request.url.split("/").pop();

    if (!id) {
        return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    console.log("AQUI O ID", id);

    const url = "https://api-publica.datajud.cnj.jus.br/api_publica_tjdft/_search";

    // Configurando os cabeçalhos
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `APIKey ${process.env.NEXT_PUBLIC_API_URL}` // Utilize a variável de ambiente para a chave da API
    };

    // Criando o corpo da requisição
    const body = {
        "query": {
            "match": {
                "numeroProcesso": `${id}`
            }
        }
    };

    try {
        // Fazendo a requisição POST
        const response = await axios.post(url, body, { headers });
        const data = response.data;
        console.log("processo obtido", data);

        // Retornando o resultado da requisição
        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Erro ao puxar processo", error);

        // Retornando erro caso ocorra na requisição
        return NextResponse.json({ error: "Erro ao obter processo" }, { status: 500 });
    }
}
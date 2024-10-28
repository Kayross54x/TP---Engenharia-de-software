import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const id = request.url.split("/").pop();

    if (!id) {
        return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

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
        const response = await axios.post(url, body, { headers });
        const data = response.data;

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("Erro ao puxar processo", error);
        return NextResponse.json({ error: "Erro ao obter processo" }, { status: 500 });
    }
}
interface JsonResponse {
    took: number;
    timed_out: boolean;
    _shards: ShardInfo;
    hits: Hits;
}

interface ShardInfo {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
}

interface Hits {
    total: TotalHits;
    max_score: number;
    hits: IProcess[];
}

interface TotalHits {
    value: number;
    relation: string; // 'eq', 'gte', etc.
}

interface IProcess {
    _index: string;
    _id: string;
    _score: number;
    _source: Source;
}

interface Source {
    numeroProcesso: string;
    classe: Classe;
    sistema: Sistema;
    formato: Formato;
    tribunal: string;
    dataHoraUltimaAtualizacao: string; // ISO 8601 date format
    grau: string;
    '@timestamp': string; // ISO 8601 date format
    dataAjuizamento: string; // ISO 8601 date format
    movimentos: Movimento[];
    id: string;
    nivelSigilo: number;
    orgaoJulgador: OrgaoJulgador;
    assuntos: Assunto[];
}

interface Classe {
    codigo: number;
    nome: string;
}

interface Sistema {
    codigo: number;
    nome: string;
}

interface Formato {
    codigo: number;
    nome: string;
}

interface Movimento {
    complementosTabelados: ComplementoTabelado[];
    codigo: number;
    nome: string;
    dataHora: string; // ISO 8601 date format
}

interface ComplementoTabelado {
    codigo: number;
    valor: number;
    nome: string;
    descricao: string;
}

interface OrgaoJulgador {
    codigoMunicipioIBGE: number;
    codigo: number;
    nome: string;
}

interface Assunto {
    codigo: number;
    nome: string;
}
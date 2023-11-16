export type Regiao = {
    id: number;
    nome: string;
    sigla: string;
}

export type UF = {
    id: number;
    nome: string;
    sigla: string
    regiao: Regiao;
}

export type Municipio = {
    id: number;
    nome: string;
}
import { UF } from "./types";

const URL_API = 'https://servicodados.ibge.gov.br/api/v1';

export async function getUFs(): Promise<UF[]> {
    const response = await fetch(`${URL_API}/localidades/estados?orderBy=nome`);
    return await response.json();
}

export async function getCidades(uf: UF): Promise<UF[]> {
    const response = await fetch(`${URL_API}/localidades/estados/${uf.id}/municipios?orderBy=nome`);
    return await response.json();
}
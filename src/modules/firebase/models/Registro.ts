import { Timestamp } from "firebase/firestore";

type FormularioRegistroProps = {
    id: string,
    pessoaId: string,
    pessoaNome: string,
    registradorPor: string,
    registradoPorFullName: string,
    registradoEm: Date,
    data: Date,
    ocorrencia: string,
    local?: string | null,
    descricao?: string | null,
    pessoasPresentes?: string | null,
    informacoesContextuais?: string | null,
    antecedentesGatilhos?: string | null,
    observacoesGerais?: string | null,
    alteradoPor?: string | null;
    alteradoPorFullName?: string | null;
    alteradoEm?: Date | null;
}


export class Registro {
    public id: string;
    public pessoaId: string;
    public pessoaNome: string;
    public registradorPor: string;
    public registradoPorFullName: string;
    public registradoEm: Date;
    public data: Date;
    public ocorrencia: string;
    public local: string | null;
    public descricao: string | null;
    public pessoasPresentes: string | null;
    public informacoesContextuais: string | null;
    public antecedentesGatilhos: string | null;
    public observacoesGerais: string | null;
    public alteradoPor: string | null;
    public alteradoPorFullName: string | null;
    public alteradoEm: Date | null;


    constructor(props: FormularioRegistroProps) {
        this.id = props.id;
        this.pessoaId = props.pessoaId;
        this.pessoaNome = props.pessoaNome;
        this.registradorPor = props.registradorPor;
        this.registradoPorFullName = props.registradoPorFullName;
        this.registradoEm = convertRequiredTimestamp(props.registradoEm);
        this.data = convertRequiredTimestamp(props.data);
        this.ocorrencia = props.ocorrencia;
        this.local = props.local ?? null;
        this.descricao = props.descricao ?? null;
        this.pessoasPresentes = props.pessoasPresentes ?? null;
        this.informacoesContextuais = props.informacoesContextuais ?? null;
        this.antecedentesGatilhos = props.antecedentesGatilhos ?? null;
        this.observacoesGerais = props.observacoesGerais ?? null;
        this.alteradoPor = props.alteradoPor ?? null;
        this.alteradoPorFullName = props.alteradoPorFullName ?? null;
        this.alteradoEm = convertTimestamp(props.alteradoEm ?? null);
    }
}

function convertRequiredTimestamp(timestamp: Date | Timestamp): Date {
    if (timestamp instanceof Date) return timestamp;
    return new Date(timestamp.seconds * 1000);
}

function convertTimestamp(timestamp: Date | Timestamp | null): Date | null {
    if (!timestamp) return null;
    return convertRequiredTimestamp(timestamp);
}

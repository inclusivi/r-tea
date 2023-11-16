export class Pessoa {
    constructor(
        public id: string,
        public responsavelUid: string,
        public nome: string,
        public sobreNome: string,
        public genero: string,
        public dataNascimento: string,
        public bio?: string,
        public photoUrl?: string,
        public convidados?: string[],
        public convidadosPending?: string[],
    ) {}
}
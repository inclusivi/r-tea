import { User } from "@/modules/user/UserInfo";
import { Pessoa } from "../models/Pessoa";
import { addDocument, loadDocument, loadDocuments, updateDocument } from "../services/database";
import { and, arrayRemove, arrayUnion, or, orderBy, where } from "firebase/firestore";
import { Registro } from "../models/Registro";

export class PessoaRepo {
    constructor(
        private readonly user: User
    ) {}

    async getPessoas(): Promise<Pessoa[]> {
        const pessoaCollection = '/pessoas';
        const filter = or(where('responsavelUid', '==', this.user.uid), where('convidados', 'array-contains', this.user.uid));
        const pessoas = await loadDocuments<Pessoa>(pessoaCollection, filter);

        return pessoas;
    }

    async getPessoa(pessoaId: string): Promise<Pessoa> {
        const pessoaDocument = `/pessoas/${pessoaId}`;
        const pessoa = await loadDocument<Pessoa>(pessoaDocument);

        if (!pessoa) throw new Error('Pessoa não encontrada');

        return pessoa;
    }

    async getPessoasPendingInvite(): Promise<Pessoa[]> {
        const pessoaCollection = '/pessoas';
        const filter = and(where('convidadosPending', 'array-contains', this.user.uid));
        const pessoas = await loadDocuments<Pessoa>(pessoaCollection, filter);

        return pessoas;
    }

    async addPessoa(pessoa: Pessoa) {
        if (pessoa.id === '') {
            const pessoaCollection = '/pessoas';
            await addDocument(pessoaCollection, {
                ...pessoa
            });
        } else {
            const pessoaDocument = `/pessoas/${pessoa.id}`;
            await updateDocument(pessoaDocument, {
                ...pessoa
            })
        }
    }

    async convidar(selectedPerson: Pessoa, userId: string) {
        const docId = `/pessoas/${selectedPerson.id}`;
        
        await updateDocument(docId, {
            convidadosPending: arrayUnion(userId)
        })
    }

    async cancelInvite(selectedPerson: Pessoa, userId: string) {
        const docId = `/pessoas/${selectedPerson.id}`;
        
        await updateDocument(docId, {
            convidados: arrayRemove(userId),
            convidadosPending: arrayRemove(userId)
        })
    }

    async acceptInvite(pessoa: Pessoa) {
        const docId = `/pessoas/${pessoa.id}`;

        await updateDocument(docId, {
            convidados: arrayUnion(this.user.uid),
            convidadosPending: arrayRemove(this.user.uid)
        })
    }

    async saveRegistro(pessoa: Pessoa, registro: Registro) {
        

        if (registro.id == '') {
            const collectionId = `/pessoas/${pessoa.id}/registros`;

            await addDocument(collectionId, {
                ...registro,
                pessoaId: pessoa.id,
                pessoaNome: `${pessoa.nome} ${pessoa.sobreNome}`,
                registradorPor: this.user.uid,
                registradoPorFullName: this.user.fullName,
                registradoEm: registro.registradoEm ?? new Date(),
            });
        } else {
            const docId = `/pessoas/${pessoa.id}/registros/${registro.id}`;

            await updateDocument(docId, {
                ...registro,
                alteradoPor: this.user.uid,
                alteradoPorFullName: this.user.fullName,
                alteradoEm: new Date(),
            });
        }
    }

    async getRegistros(pessoa: Pessoa) {
        const collectionId = `/pessoas/${pessoa.id}/registros`;

        const registros = await loadDocuments<Registro>(collectionId, undefined, orderBy('data', 'desc'));

        return registros.map(registro => new Registro({...registro}));
    }

    async getRegistro(pessoa: Pessoa, registroId: string) {
        const docId = `/pessoas/${pessoa.id}/registros/${registroId}`;
        const registro = await loadDocument<Registro>(docId);
        if (registro == null) return null;
        return new Registro({...registro});
    }
}
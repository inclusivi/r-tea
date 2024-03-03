import { UserKind } from "../firebase/models/UserKind";
import { User } from "../user/UserInfo";

export interface IUserContext {
    user: User;
    labelPessoas: string;
    allowCreatePessoa: boolean;
}

export class UserContext implements IUserContext {
    private readonly _userKind: UserKind;

    constructor(public readonly user: User) {
        this._userKind = this.user.profile.userKind ?? UserKind.Admin;
    }

    get labelPessoas(): string {
        switch (this._userKind) {
            case UserKind.Responsavel:
            case UserKind.Cuidador:
                return 'Dependentes';
            case UserKind.ProfissionalSaude:
                return 'Clientes';
            case UserKind.Educador:
                return 'Alunos';
            default:
                return 'Pessoas';
        }
    }

    // o código abaixo permite aos seguintes tipos de usuário criarem "pessoas", ou enviarem convites. || é o operador "ou".
    get allowCreatePessoa(): boolean {
        return (
            this._userKind === UserKind.Admin ||
            this._userKind === UserKind.Responsavel ||
            this._userKind === UserKind.PessoaAutista ||
            this._userKind === UserKind.PessoaSemDiagnostico
        );
    }
}

export class NoUserContext implements IUserContext {
    get user(): User {
        throw new Error("User not logged in");
    }

    get labelPessoas(): string {
        return 'Pessoas';
    }

    get allowCreatePessoa(): boolean {
        return false;
    }
}
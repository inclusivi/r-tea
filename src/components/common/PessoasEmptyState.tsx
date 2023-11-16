'use client';

import { useAuthContext } from "../auth/AuthContext";
import EmptyState from "../shared/elements/EmptyState";

export default function PessoasEmptyState() {
    const { userCtx } = useAuthContext();

    return (
        <EmptyState
            message={`Nenhum cadastro de ${userCtx.labelPessoas} encontrado`}
            action={userCtx.allowCreatePessoa ? `Cadastrar ${userCtx.labelPessoas}` : 'Ver convites'}
            link={userCtx.allowCreatePessoa ? "/user/pessoas/edit" : '/user/convites'}
        />
    );
}
'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthContext";
import { Box, Divider, Typography } from "@mui/material";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import LoadingModal from "@/components/loading/LoadingModal";
import { Registro } from "@/modules/firebase/models/Registro";
import { FormularioRegistro } from "../FormularioRegistro";

export default function EditRecordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();

    const [pessoa, setPessoa] = React.useState<Pessoa | null>(null);
    const [registro, setRegistro] = React.useState<Registro | null>(null);

    const [loading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(false);

    React.useEffect(() => {
        async function loadPessoas() {
            const pessoaId = searchParams.get('pid') ?? '';
            const registroId = searchParams.get('id') ?? '';
            if (!pessoaId) {
                router.push('/user/registros/lista');
                return;
            }
            if (!registroId) {
                router.push(`/user/registros/lista?id=${pessoaId}`);
                return;
            }

            const repo = new PessoaRepo(userCtx.user);
            const pessoa = await repo.getPessoa(pessoaId);
            const registro = await repo.getRegistro(pessoa, registroId);

            if (pessoa == null || registro == null) {
                router.push('/user/registros/lista');
                return;
            }

            setPessoa(pessoa);
            setRegistro(registro);

            setLoading(false);
        }

        loadPessoas();
    }, [userCtx, searchParams, router]);


    const handleGravarRegistro = async (registro: Registro) => {
        if (pessoa == null) return;
        
        setPending(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.saveRegistro(pessoa, registro);
            router.push('/user/registros/lista');
        }finally{
            setPending(false);
        }
    }

    if (loading || !pessoa || !registro) return <LoadingModal />;


    return (
        <>
            <LoadingModal visible={pending} />
            <Typography variant="h3" color='primary'>Editar Registro</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <Box mt={3}>
                <FormularioRegistro pessoa={pessoa} onGravarRegistro={handleGravarRegistro} action="editar" registro={registro} />
            </Box>
        </>
    );

}



'use client';

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/components/auth/AuthContext";
import ObservacoesTree from "./ObservacoesTree";
import { observacoes } from "../comportamentos";
import { Box, Divider, Typography } from "@mui/material";
import PersonPicker from "@/components/pickers/PersonPicker";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import LoadingModal from "@/components/loading/LoadingModal";
import { Registro } from "@/modules/firebase/models/Registro";

export default function AddRecordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();
    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
    const [selectedPersonId, setSelectedPersonId] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(false);
    const userKind = userCtx.user.profile.userKind!;
    

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoas();

            setPessoas(pessoas);
            setSelectedPersonId(searchParams.get('id') ?? pessoas[0].id);
            setLoading(false);
        }

        loadPessoas();
    }, [userCtx, searchParams]);

    const handlePersonChange = (person: Pessoa) => {
        setSelectedPersonId(person.id);
        router.replace(`/user/registros/novo?id=${person.id}`);
    }

    const handleGravarRegistro = async (registro: Registro) => {
        setPending(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.saveRegistro(selectedPerson, registro);
            router.refresh();
        }finally{
            setPending(false);
        }
    }

    if (loading) return <LoadingModal />;

    const selectedPerson = pessoas.find(p => p.id === selectedPersonId) ?? pessoas[0];

    return (
        <>
            <LoadingModal visible={pending} />
            <Typography variant="h3" color='primary'>Novo Registro</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <PersonPicker label="Adicionando registro para" pessoas={pessoas} selectedPerson={selectedPerson} userKind={userKind} onChange={handlePersonChange} />
            <Box mt={3}>
                <ObservacoesTree data={observacoes} pessoa={selectedPerson} onGravarRegistro={handleGravarRegistro}/>
            </Box>
        </>
    );

}



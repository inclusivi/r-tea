'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import PessoasEmptyState from "@/components/common/PessoasEmptyState";
import LoadingModal from "@/components/loading/LoadingModal";
import PersonPicker from "@/components/pickers/PersonPicker";
import EmptyState from "@/components/shared/elements/EmptyState";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import { Registro } from "@/modules/firebase/models/Registro";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Card, Divider, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useRouter, useSearchParams } from "next/navigation";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

export default function RegistrosPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();
    const userKind = userCtx.user.profile.userKind!;

    const [loading, setLoading] = React.useState(true);
    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
    const [registros, setRegistros] = React.useState<Registro[]>([]);
    const [selectedPersonId, setSelectedPersonId] = React.useState('');

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoas();

            setPessoas(pessoas);
            if (pessoas.length > 0) {
                const selectedPersonId = searchParams.get('id') ?? pessoas[0].id;
                setSelectedPersonId(selectedPersonId);

                const selectedPerson = pessoas.find(p => p.id === selectedPersonId) ?? pessoas[0];
                const registros = await repo.getRegistros(selectedPerson);

                setRegistros(registros);
            }

            setLoading(false);
        }

        loadPessoas();
    }, [userCtx, searchParams]);

    const handlePersonChange = (person: Pessoa) => {
        setSelectedPersonId(person.id);
        setLoading(true);
        router.replace(`/user/registros/lista?id=${person.id}`);
    }

    const columns: GridColDef[] = [
        { field: 'data', headerName: 'Data', minWidth: 150, valueFormatter: (params) => new Date(params.value).toLocaleString('pt-BR') },
        { field: 'registradoPorFullName', headerName: 'Registrado por', maxWidth: 150, flex: 1 },
        { field: 'ocorrencia', headerName: 'Ocorrência', flex: 3 },
        {
            field: 'actions', type: 'actions', headerName: 'Editar', width: 100, getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} label="Edit" key="edit" onClick={() => router.push(`/user/registros/edit?pid=${params.row.pessoaId}&id=${params.id}`)} />,
            ]
        },
    ];
    
    if (loading) return <LoadingModal />;

    if (pessoas.length === 0) return (
        <>
            <Typography variant="h3" color='primary'>Registros</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <PessoasEmptyState />
        </>
    );

    const selectedPerson = pessoas.find(p => p.id === selectedPersonId) ?? pessoas[0];

    return (
        <>
            <Typography variant="h3" color='primary'>Registros</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            <PersonPicker label="Visualizando registros para" pessoas={pessoas} selectedPerson={selectedPerson} userKind={userKind} onChange={handlePersonChange} />

            {registros.length === 0
                ? (<EmptyState message="Nenhum registro encontrado" action="Adicionar registro" link={`/user/registros/novo?id=${selectedPerson.id}`} />)
                : (<>
                    <Typography variant="h5" color='gray' sx={{ mt: 3, mb: 1 }}>Histórico de registros</Typography>
                    <Card >
                        <DataGrid
                            rows={registros}
                            columns={columns}
                            autoHeight
                            density="compact"
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'data', sort: 'desc' }],
                                },
                            }}
                        />
                    </Card>
                </>)
            }
        </>
    )
}


'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import PessoasEmptyState from "@/components/common/PessoasEmptyState";
import LoadingModal from "@/components/loading/LoadingModal";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Avatar, Box, Button, Card, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import Link from "next/link";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function DependentesPage() {
    const router = useRouter();
    const { userCtx } = useAuthContext();

    const [loading, setLoading] = React.useState(true);
    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoas();
            setPessoas(pessoas);
            setLoading(false);
        }

        loadPessoas();
    }, [userCtx]);

    if (loading) return <LoadingModal />;

    return (
        <>
            <Typography variant="h3" color='primary'>{userCtx.labelPessoas}</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            {pessoas.length === 0
                ? (
                    <PessoasEmptyState />
                ) : (
                    <>
                        {userCtx.allowCreatePessoa && (
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={() => router.push('/user/pessoas/edit')}>Novo Cadastro</Button>
                            </Box>
                        )}

                        <Box sx={{ mt: 3 }}>
                            <Grid2 container spacing={2}>
                                {pessoas.map(p => (
                                    <Grid2 xs={12} lg={6} xl={4} key={p.id}>
                                        <Card sx={{ py: 1, px: 2, display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                                            <Avatar alt={p.nome} src={p.photoUrl} sx={{ width: 64, height: 64 }} />
                                            <Typography variant="h5" sx={{ mr: 'auto' }}>{p.nome} {p.sobreNome}</Typography>

                                            {userCtx.allowCreatePessoa && (
                                                <>
                                                    <Tooltip title="Editar">
                                                        <Link href={{ pathname: '/user/pessoas/edit', query: { id: p.id } }} passHref>
                                                            <IconButton>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                    <Tooltip title="Convidar">
                                                        <Link href={{ pathname: '/user/invites', query: { id: p.id } }} passHref>
                                                            <IconButton>
                                                                <ShareIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                </>
                                            )}
                                            <Tooltip title="Adicionar Registro">
                                                <Link href={{ pathname: '/user/registros/novo', query: { id: p.id } }} passHref>
                                                    <IconButton>
                                                        <PostAddOutlinedIcon />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                        </Card>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                    </>
                )}
        </>
    );

}


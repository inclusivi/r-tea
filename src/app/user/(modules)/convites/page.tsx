'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import LoadingModal from "@/components/loading/LoadingModal";
import EmptyState from "@/components/shared/elements/EmptyState";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { getProfileRepository } from "@/modules/firebase";
import { UserKind } from "@/modules/firebase/models/UserKind";
import { UserProfile } from "@/modules/firebase/models/UserProfile";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ConvitesPage() {
    const { userCtx } = useAuthContext();
    
    const [loading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(false);
    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
    const [profiles, setProfiles] = React.useState<UserProfile[]>([]);

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoasPendingInvite();

            const profileRepo = await getProfileRepository(userCtx.user);
            const profiles = await profileRepo.getProfiles([UserKind.Responsavel]);

            setPessoas(pessoas);
            setProfiles(profiles);
            setLoading(false);
        }

        loadPessoas();
    }, [userCtx]);

    const getResponsavel = (pessoa: Pessoa) => {
        const profile = profiles.find(p => p.userId === pessoa.responsavelUid);
        if (!profile) return null;

        return `${profile.firstName} ${profile.lastName}`;
    }

    const aceitarConvite = async (pessoa: Pessoa) => {
        setPending(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.acceptInvite(pessoa);

            const newPessoas = pessoas.filter(p => p.id !== pessoa.id);
            setPessoas(newPessoas);
        } finally {
            setPending(false);
        }
    }

    if (loading) return <LoadingModal />;

    return (
        <>
            <LoadingModal visible={pending} />
            <Typography variant="h3" color='primary'>Convites Recebidos</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            {pessoas.length === 0
                ? (
                    <EmptyState message={`Nenhum convite pendente encontrado`}
                        action={`Ver ${userCtx.labelPessoas}`}
                        link='/user/pessoas/lista'
                    />
                ) : (
                    <>
                        <Box sx={{ mt: 3 }}>
                            <Grid2 container spacing={2} justifyContent='stretch'>
                                {pessoas.map(pessoa => (
                                    <Grid2 xs={12} lg={6} xl={4} key={pessoa.id}>
                                        <Card sx={{ display: "flex", flexDirection: "column", height: '100%' }}>
                                            <CardContent>
                                                <Box display='flex' flexDirection='row' gap={2} alignItems='center' mb={2}>
                                                    <Box>
                                                        <Avatar alt={pessoa.nome} src={pessoa.photoUrl} sx={{ width: '64px', height: '64px', aspectRatio: 1 }} />
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h5" color='primary'>{pessoa.nome} {pessoa.sobreNome}</Typography>
                                                        <Typography variant="h6" color='gray'>Responsável:<strong> {getResponsavel(pessoa)}</strong></Typography>
                                                    </Box>
                                                </Box>
                                                <Box mt={2}>
                                                    <Typography variant="h6" color='gray' sx={{ mb: 1 }}>Sobre mim</Typography>
                                                    <Typography>{pessoa.bio}</Typography>
                                                </Box>
                                            </CardContent>
                                            <CardActions sx={{ mt: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                <Link href={{ pathname: '/user/profiles', query: { id: pessoa.id } }} passHref>
                                                    <Button color="error">
                                                        <Typography noWrap>Ignorar</Typography>
                                                    </Button>
                                                </Link>
                                                <Button color="primary" onClick={() => aceitarConvite(pessoa)}>
                                                    <Typography noWrap>Aceitar</Typography>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid2>
                                ))}
                            </Grid2>
                        </Box>
                    </>
                )
            }
        </>
    );
}
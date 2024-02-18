'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import LoadingModal from "@/components/loading/LoadingModal";
import EmptyState from "@/components/shared/elements/EmptyState";
import { getProfileRepository } from "@/modules/firebase";
import { Pessoa } from "@/modules/firebase/models/Pessoa";
import { UserKind, UserKindDescriptions } from "@/modules/firebase/models/UserKind";
import { UserProfile } from "@/modules/firebase/models/UserProfile";
import { PessoaRepo } from "@/modules/firebase/repositories/PessoaRepo";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import cover from '@/assets/images/profile-cover.jpg';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PersonPicker from "@/components/pickers/PersonPicker";
import PessoasEmptyState from "@/components/common/PessoasEmptyState";

type SituacaoConvite = 'pending' | 'accepted' | 'none';

type ProfileCardProps = {
    profile: UserProfile,
    situacaoConvite: SituacaoConvite,
    onInvite: (userId: string) => void,
}

type ButtonVariant = 'outlined' | 'contained' | 'text';

function ProfileCard({ profile, situacaoConvite, onInvite }: ProfileCardProps) {

    const ProfileCardActions = ({ variant }: { variant: ButtonVariant }) => (
        <>
            <Link href={{ pathname: '/user/profiles', query: { id: profile.userId } }} passHref>
                <Button variant={variant} color="info">
                    <Typography noWrap>Ver perfil</Typography>
                </Button>
            </Link>
            <Button variant={variant} color={situacaoConvite == 'none' ? "primary" : 'error'} onClick={() => onInvite(profile.userId!)}>
                <Typography noWrap>{situacaoConvite == "none" ? 'Convidar' : 'Cancelar'}</Typography>
            </Button>
        </>
    );

    return (
        <Card key={profile.userId} >
            <CardMedia sx={{ position: 'relative', height: '24px' }}>
                <Image src={profile.coverPhotoUrl ?? cover} alt={profile.firstName ?? ''} fill style={{ objectFit: 'cover', zIndex: 0 }} />
            </CardMedia>
            <CardContent>
                <Box display='flex' flexDirection='row' gap={2} alignItems='center'>
                    <Box>
                        <Avatar alt={profile.firstName ?? ''} src={profile.photoUrl ?? ''} sx={{ width: '64px', height: '64px', aspectRatio: 1 }} />
                    </Box>
                    <Box flexGrow={1}>
                        <Typography variant="h5" color='primary'>{profile.firstName} {profile.lastName}</Typography>
                        <Typography variant="h6">{UserKindDescriptions[profile.userKind ?? UserKind.Guest]}</Typography>
                    </Box>
                    {situacaoConvite != 'none' &&
                            <Chip
                                size="small"
                                label={situacaoConvite == "pending" ? 'Pendente' : 'Aceito'}
                                color={situacaoConvite == "pending" ? 'default' : 'success'}
                            />
                        }

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: {sm: 'row', md: 'row'}, gap: 2 }}>
                        <ProfileCardActions variant="outlined" />
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
                <ProfileCardActions variant="text" />
            </CardActions>
        </Card>
    );
}

export default function InvitesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();
    const userKind = userCtx.user.profile.userKind!;

    const [loading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(false);

    const [selectedPersonId, setSelectedPersonId] = React.useState('');

    const [pessoas, setPessoas] = React.useState<Pessoa[]>([]);
    const [profiles, setProfiles] = React.useState<UserProfile[]>([]);

    React.useEffect(() => {
        async function loadPessoas() {
            const repo = new PessoaRepo(userCtx.user);
            const pessoas = await repo.getPessoas();

            const profileRepo = await getProfileRepository(userCtx.user);
            const profiles = await profileRepo.getProfiles([UserKind.ProfissionalSaude, UserKind.Educador, UserKind.Cuidador]);

            setPessoas(pessoas);
            setProfiles(profiles);

            if (pessoas.length > 0) {
                setSelectedPersonId(searchParams.get('id') ?? pessoas[0].id);
            }

            setLoading(false);
        }

        loadPessoas();
    }, [userCtx, searchParams]);

    const isConvidado = (profile?: UserProfile, pessoa?: Pessoa) => {
        if (!profile || !pessoa) return false;
        return isConviteAceito(profile, pessoa) || isConvitePending(profile, pessoa);
    }

    const isConvitePending = (profile?: UserProfile, pessoa?: Pessoa) => {
        if (!profile || !pessoa) return false;

        const userId = profile.userId ?? '';
        const convidadosPending = pessoa.convidadosPending ?? [];

        return convidadosPending.includes(userId);
    }

    const isConviteAceito = (profile?: UserProfile, pessoa?: Pessoa) => {
        if (!profile || !pessoa) return false;

        const userId = profile.userId ?? '';
        const convidados = pessoa.convidados ?? [];

        return convidados.includes(userId);
    }

    const getSituacaoConvite = (profile: UserProfile) => {
        if (isConviteAceito(profile, selectedPerson)) return 'accepted';
        if (isConvitePending(profile, selectedPerson)) return 'pending';
        return 'none';
    }

    const handleConvidar = async (userId: string) => {
        if (!selectedPerson) return;

        setPending(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.convidar(selectedPerson, userId);

            const pessoas = await repo.getPessoas();
            setPessoas(pessoas);
        } finally {
            setPending(false);
        }
    }

    const handleCancelInvite = async (userId: string) => {
        if (!selectedPerson) return;

        setPending(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.cancelInvite(selectedPerson, userId);

            const pessoas = await repo.getPessoas();
            setPessoas(pessoas);
        } finally {
            setPending(false);
        }
    }

    const handlePersonChange = (pessoa: Pessoa) => {
        setLoading(true);
        setSelectedPersonId(pessoa.id);
        router.replace('/user/invites?id=' + pessoa.id);
    }


    if (loading) return <LoadingModal />;

    if (pessoas.length === 0) return (
        <>
            <Typography variant="h3" color='primary'>Enviar Convite</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />
            <PessoasEmptyState />
        </>
    );

    const selectedPerson = pessoas.find(p => p.id === selectedPersonId);
    const convidados = profiles.filter((profile) => isConvidado(profile, selectedPerson));
    const naoConvidados = profiles.filter((profile) => !isConvidado(profile, selectedPerson));

    return (
        <>
            <LoadingModal visible={pending} />
            <Typography variant="h3" color='primary'>Enviar Convite</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            <PersonPicker label="Visualizando convites para" pessoas={pessoas} selectedPerson={selectedPerson ?? pessoas[0]} userKind={userKind} onChange={handlePersonChange} />

            {profiles.length === 0
                ? (
                    <>
                        <EmptyState />
                    </>
                )
                : (
                    <Box display="flex" flexDirection='column' justifyContent='stretch' gap={2}>
                        {convidados.length > 0 && (
                            <>
                                <Typography variant="h5" color='primary' sx={{ mt: 3 }}>Convites enviados</Typography>
                                {convidados.map(profile => (<ProfileCard key={profile.userId} profile={profile} situacaoConvite={getSituacaoConvite(profile)} onInvite={handleCancelInvite} />))}
                            </>
                        )}


                        {naoConvidados.length > 0 && (
                            <>
                                <Typography variant="h5" color='primary' sx={{ mt: 3 }}>Enviar convite para</Typography>
                                {naoConvidados.map(profile => (<ProfileCard key={profile.userId} profile={profile} situacaoConvite={getSituacaoConvite(profile)} onInvite={handleConvidar} />))}
                            </>
                        )}
                    </Box>
                )
            }
        </>
    );
}
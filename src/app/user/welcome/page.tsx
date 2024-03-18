'use client';

import parents from '@/assets/images/icons/parents.png';
import babysitter from '@/assets/images/icons/babysitter.png';
import teacher from '@/assets/images/icons/teacher.png';
import therapist from '@/assets/images/icons/therapist.png';
import autistic from '@/assets/images/icons/autisticPerson2.png';
import personInDiscover from '@/assets/images/icons/personInDiscover.png';

import { useState } from "react";
import { Card, CardContent, Grid, Typography, Divider, Button, Box, Modal } from "@mui/material";
import { UserKind, UserKindDescriptions } from "@/modules/firebase/models/UserKind";
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { DefaultLoader } from '@/components/loading/DefaultLoader';
import { getProfileRepository } from '@/modules/firebase';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/components/auth/AuthContext';
import AcessoNegado from "@/components/common/AcessoNegado";

function ChoiceCard({ title, description, image, value, selected, onClick }: {
    title: string;
    description: string;
    image: string | StaticImport;
    value: UserKind;
    selected: UserKind | null;
    onClick: (userKind: UserKind) => void;
}) {
    const cardBgColor = value === selected ? 'secondary.main' : 'background.paper';

    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    bgcolor: cardBgColor,
                    cursor: 'pointer',
                }}
                onClick={() => onClick(value)}
            >
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image src={image} alt={title} width={128} />
                    </Box>
                    <Typography gutterBottom variant="h4" component="h2" sx={{ mt: 2 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default function WelcomePage() {
    const router = useRouter();
    const { user, reloadUser } = useAuthContext();

    const [selectedUserKind, setSelectedUserKind] = useState<UserKind | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUserKindClick = (userKind: UserKind) => {
        setSelectedUserKind(userKind);
    };

    const handleSaveClick = async () => {
        if (selectedUserKind === null) {
            return;
        }

        setLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            await profileRepo.updateUserKind(selectedUserKind);
            await reloadUser();
            router.push('/user/config');
        } finally {
            setLoading(false);
        }
    };
    
    if (user?.profile.userKind != null) {
      return AcessoNegado();
    }

    return (
        <>
            <Modal open={loading} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DefaultLoader />
            </Modal>

            <Typography variant="h3" color='primary'>Escolha seu perfil</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            <Grid container spacing={2}>
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.Responsavel]}
                    description='Parente ou guardião legal da pessoa autista. Permite cadastrar dependentes e gerenciar o compartilhamento de informações com os demais usuários.'
                    value={UserKind.Responsavel}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={parents}
                />
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.ProfissionalSaude]}
                    description='Médicos, terapeutas, psicólogos e outros especialistas envolvidos no cuidado e no tratamento da pessoa autista. Permite adicionar e visualizar os registros dos pacientes, visualizar relatórios especializados e priorizar opções de registros de acordo com plano terapeurico.'
                    value={UserKind.ProfissionalSaude}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={therapist}
                />
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.Educador]}
                    description='Professores e especialistas em educação especial, com permissão para registrar observações relacionadas ao comportamento e desempenho acadêmico de alunos autistas.'
                    value={UserKind.Educador}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={teacher}
                />
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.Cuidador]}
                    description='Indivíduos que prestam assistência direta e suporte diário a pessoas autistas. Permite adicionar registros no histórico da pessoa autista.'
                    value={UserKind.Cuidador}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={babysitter}
                />
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.PessoaAutista]}
                    description='Autistas adultos. Permite adicionar e acompanhar os próprios registros e informações, além de gerenciar o compartilhamento do perfil com outros usuários.'
                    value={UserKind.PessoaAutista}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={autistic}
                />
                <ChoiceCard
                    title={UserKindDescriptions[UserKind.PessoaSemDiagnostico]}
                    description='Aquelas pessoas que ainda estão em sua jornada de descoberta e querem experimentar a plataforma, mas ainda não têm um diagnóstico definido. Dá acesso as mesmas funções que a pessoa autista.'
                    value={UserKind.PessoaSemDiagnostico}
                    selected={selectedUserKind}
                    onClick={handleUserKindClick}
                    image={personInDiscover}
                />
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleSaveClick} disabled={selectedUserKind === null}>Salvar</Button>
            </Box>
        </>
    );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { Avatar, Box, Button, Card, Divider, IconButton, Tab, Tabs, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { UserKindDescriptions } from '@/modules/firebase/models/UserKind';
import { UserProfile } from '@/modules/firebase/models/UserProfile';
import cover from '@/assets/images/profile-cover.jpg';


function TabPanel(
    props: { children: React.ReactNode; value: number; index: number; }
) {
    return (
        <>
            {props.value === props.index && (
                <Box sx={{ mt: 2 }}>
                    {props.children}
                </Box>
            )}
        </>
    );
}

export default function ProfileHeader({ profile, showEdit }: { profile: UserProfile, showEdit: boolean }) {
    const router = useRouter();

    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabsChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    }

    const handleEditProfile = () => {
        router.push('/user/config')
    }

    return (
        <>
            <Box sx={{ mt: 3 }}>
                {/* Bg */}
                <Card sx={{ position: 'relative' }}>
                    <Box position='relative' sx={{ height: { xs: '96px', md: '128px' } }}>
                        <Image src={profile.coverPhotoUrl ?? cover} fill alt='Capa do Perfil' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    {showEdit && <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'absolute', right: 0, top: 0, p: 1, zIndex: 10000 }}>
                        <Tooltip title="Editar perfil">
                            <IconButton onClick={handleEditProfile}>
                                <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.3)' }}>
                                    <EditIcon fontSize='small' />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    }
                    <Box sx={{ ml: 3, mb: 3, display: 'flex' }}>
                        {/* avatar */}
                        <Box sx={{ width: { xs: '148px', md: '180px' } }}>
                            <Avatar alt={profile.firstName!} src={profile.photoUrl!} sx={{ marginTop: '-50%', width: '100%', height: 'auto', aspectRatio: 1, borderWidth: 5 }} />
                        </Box>
                        {/* text */}
                        <Box sx={{ mt: 2, ml: 2, flexGrow: 1 }}>
                            <Typography variant='h2' color='primary'>{profile.firstName} {profile.lastName}</Typography>
                            <Typography variant='h6'>{UserKindDescriptions[profile.userKind!]}</Typography>
                        </Box>
                        {showEdit && <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button variant="outlined" color="primary" sx={{ mr: 3, mt: 5 }} onClick={handleEditProfile}>Editar Perfil</Button>
                        </Box>
                        }
                    </Box>
                    <Divider />
                    <Tabs value={tabIndex} onChange={handleTabsChange}>
                        <Tab label="Visão Geral" />
                        <Tab label="Sobre mim" />
                    </Tabs>
                </Card>
            </Box >
            <TabPanel value={tabIndex} index={0}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                        <Card sx={{ p: 3, height: '100%' }}>
                            <Typography variant='h5' color='gray'>Informações Básicas</Typography>

                            <Typography variant='h6' color='primary' sx={{ mt: 1 }}>Email</Typography>
                            <Typography>{profile.email}</Typography>

                            <Typography variant='h6' color='primary' sx={{ mt: 1 }}>Município</Typography>
                            {profile.municipioId ? <Typography>{profile.municipioName}</Typography> : <Typography>Não informado</Typography>}

                            <Typography variant='h6' color='primary' sx={{ mt: 1 }}>Estado</Typography>
                            {profile.ufId ? <Typography>{profile.ufName} ({profile.ufSigla})</Typography> : <Typography>Não informado</Typography>}
                        </Card>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Card sx={{ p: 3, height: '100%' }}>
                            <Typography variant='h5' color='gray'>Atividade Recente</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <Card sx={{ p: 3 }}>
                    <Typography variant='h5' color='gray' sx={{ mb: 1 }}>Introdução</Typography>
                    <Typography>
                        {profile.introText}
                    </Typography>
                </Card>
            </TabPanel>
        </>
    )
}
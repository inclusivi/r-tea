
'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import EditIcon from '@mui/icons-material/Edit';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, Card, Avatar, Badge, IconButton, MenuItem, Modal } from '@mui/material';
import { Pessoa } from '@/modules/firebase/models/Pessoa';
import { useAuthContext } from '@/components/auth/AuthContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useRouter, useSearchParams } from 'next/navigation';
import { PessoaRepo } from '@/modules/firebase/repositories/PessoaRepo';
import LoadingModal from '@/components/loading/LoadingModal';

export default function EditPessoa() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { userCtx } = useAuthContext();

    const [loading, setLoading] = useState(false);

    const [novaPessoa, setNovaPessoa] = useState<Pessoa>({
        id: '',
        responsavelUid: userCtx.user.uid,
        nome: '',
        sobreNome: '',
        genero: '',
        dataNascimento: '',
        bio: '',
        photoUrl: '',
        convidados: [],
    });

    React.useEffect(() => {
        async function loadPessoa() {
            const pessoaId = searchParams.get('id');
            if (!pessoaId) return;

            const repo = new PessoaRepo(userCtx.user);
            const pessoa = await repo.getPessoa(pessoaId);
            setNovaPessoa(pessoa);
        }

        loadPessoa();
    }, [searchParams, userCtx]);

    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                setNovaPessoa({ ...novaPessoa, photoUrl: event.target.result as string });
            }
        };
        reader.readAsDataURL(files[0]);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNovaPessoa({ ...novaPessoa, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await enviarNovaPessoa(novaPessoa);
    };

    const enviarNovaPessoa = async (pessoa: Pessoa) => {
        setLoading(true);
        try {
            const repo = new PessoaRepo(userCtx.user);
            await repo.addPessoa(pessoa);
            router.push('/user/pessoas/lista');
        } finally {
            setLoading(false);
        }
    };

    if (!userCtx.allowCreatePessoa) {
        router.push('/user/pessoas');
        return (<></>);
    }

    return (
        <>
            <LoadingModal visible={loading} />
            <Typography variant="h3" color='primary'>{novaPessoa.id == '' ? 'Cadastrar' : 'Editar'} {userCtx.labelPessoas}</Typography>
            <Divider sx={{ mt: 1, mb: 3 }} />

            <Box>
                <Card sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'flex-start' }, gap: 3 }}>
                    <Box sx={{ margin: '0 auto' }}>
                        <Badge
                            overlap="circular"
                            badgeContent={
                                <IconButton color='primary' component="label" htmlFor='avatarFile'>
                                    <Avatar sx={{ border: 2 }}>
                                        <EditIcon fill='white' />
                                    </Avatar>
                                </IconButton>
                            }>
                            <Button component="label">
                                <Avatar src={novaPessoa.photoUrl} sx={{ width: { xs: '148px', md: '180px' }, height: 'auto', aspectRatio: 1 }} />
                                <input id='avatarFile' type="file" hidden onChange={handleAvatarUpload} />
                            </Button>
                        </Badge>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>

                        <Typography variant='h5' color='gray'>Informações básicas</Typography>

                        <Box display='flex' gap={2} justifyContent='stretch' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField label="Nome" name="nome" value={novaPessoa.nome} onChange={handleInputChange} variant="filled" fullWidth />
                            <TextField label="Sobrenome" name="sobreNome" value={novaPessoa.sobreNome} onChange={handleInputChange} variant="filled" fullWidth />
                        </Box>

                        <Box display='flex' gap={2} justifyContent='stretch' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField label="Gênero" name="genero" value={novaPessoa.genero} onChange={handleInputChange} variant="filled" fullWidth select>
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Feminino</MenuItem>
                                <MenuItem value="O">Outro</MenuItem>
                                <MenuItem value="X">Prefiro não informar</MenuItem>
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DatePicker
                                    label="Data de Nascimento"
                                    value={novaPessoa.dataNascimento ? dayjs(novaPessoa.dataNascimento) : null}
                                    onChange={(date) => setNovaPessoa({ ...novaPessoa, dataNascimento: date?.format('YYYY-MM-DD') || '' })}
                                    sx={{ width: '100%' }}
                                    slotProps={{ textField: { variant: "filled" } }}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Typography variant='h5' color='gray' sx={{ mt: 2 }}>Perfil público</Typography>

                        <TextField
                            label="Sobre mim"
                            name="bio"
                            value={novaPessoa.bio}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            variant="filled"
                        />
                        <Box display='flex' justifyContent='flex-end'>
                            <Button type="submit" variant="contained">
                                <Typography>{novaPessoa.id == '' ? 'Cadastrar' : 'Gravar'}</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
}




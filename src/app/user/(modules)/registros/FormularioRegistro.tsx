'use client';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useAuthContext } from '@/components/auth/AuthContext';
import { Avatar, Box, Button, Card, TextField, Typography } from '@mui/material';
import { Pessoa } from '@/modules/firebase/models/Pessoa';
import { Registro } from '@/modules/firebase/models/Registro';
import { Item } from './comportamentos';
import { useState } from 'react';
import Image from 'next/image';

interface FormularioRegistroPropsBase {
    onGravarRegistro: (registro: Registro) => Promise<void>;
    pessoa: Pessoa;
}

interface FormularioRegistroPropsNovo {
    action: 'novo';
    stack: Item[];
}

interface FormularioRegistroPropsEditar {
    action: 'editar';
    registro: Registro;
}

type FormularioRegistroProps = FormularioRegistroPropsBase & (FormularioRegistroPropsNovo | FormularioRegistroPropsEditar);

export const FormularioRegistro: React.FC<FormularioRegistroProps> = ({ pessoa, onGravarRegistro, ...props }) => {
    const { userCtx } = useAuthContext();

    const [data, setData] = useState<Registro>(props.action == 'editar' ? props.registro : new Registro({
        id: '',
        pessoaId: pessoa.id,
        pessoaNome: `${pessoa.nome} ${pessoa.sobreNome}`,
        registradorPor: userCtx.user.uid,
        registradoPorFullName: userCtx.user.fullName,
        registradoEm: new Date(),
        data: new Date(),
        ocorrencia: props.stack.map(i => i.label).join(' / '),
        descricao: props.stack[props.stack.length - 1].descricao,
    }));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    return (
        <Card sx={{ mt: 2, p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {props.action == 'editar' && (
                    <>
                        <Typography variant='h6' color='gray'>Registro para</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <Avatar src={pessoa.photoUrl} alt={pessoa.nome} sx={{ width: 48, height: 48 }} />
                            <Typography variant='h5' color='primary'>{pessoa.nome} {pessoa.sobreNome}</Typography>
                        </Box>
                        <Typography variant='h6' color='gray' sx={{ mt: 3 }}>Detalhes do Registro</Typography>
                    </>
                )}

                <Grid2 container spacing={2}>
                    <Grid2 xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                            <DateTimePicker
                                label="Data/Hora"
                                slotProps={{ textField: { variant: "filled", fullWidth: true } }}
                                value={dayjs(data.data)}
                                onChange={(newValue) => {
                                    setData({ ...data, data: newValue?.toDate() ?? new Date() });
                                }}
                            />
                        </LocalizationProvider>
                    </Grid2>
                    <Grid2 xs={12} sm={6}>
                        <TextField label="Local" variant="filled" fullWidth name="local" value={data.local} onChange={handleInputChange} />
                    </Grid2>
                </Grid2>

                <TextField label="Ocorrência" variant="filled" value={data.ocorrencia} />
                <TextField label="Descrição" variant="filled" value={data.descricao} />
                <TextField label="Pessoas Presentes" variant="filled" name="pessoasPresentes" value={data.pessoasPresentes} onChange={handleInputChange} />
                <TextField label="Informações contextuais" variant="filled" name="informacoesContextuais" value={data.informacoesContextuais} onChange={handleInputChange} />
                <TextField label="Antecedentes e/ou gatilhos" variant="filled" name="antecedentesGatilhos" value={data.antecedentesGatilhos} onChange={handleInputChange} />
                <TextField label="Observações Gerais" variant="filled" multiline rows={4} name="observacoesGerais" value={data.observacoesGerais} onChange={handleInputChange} />

                <Box display='flex' alignItems='center' sx={{ flexDirection: { xs: 'column', sm: 'row' } }} gap={2}>
                    <Box display='flex' alignItems='flex-start' sx={{ flexDirection:  'column' }} flexGrow={1} alignSelf='stretch'>
                        <Typography variant='caption' color='gray' sx={{ mr: 'auto' }}>Registrado por {data.registradoPorFullName} em {dayjs(data.registradoEm).locale('pt-br').format('L LT')}</Typography>
                        {data.alteradoEm && <Typography variant='caption' color='gray'>Alterado por {data.alteradoPorFullName} em {dayjs(data.alteradoEm).locale('pt-br').format('L LT')}</Typography>}
                    </Box>
                    <Button variant="contained" color="primary" onClick={() => onGravarRegistro(data)}>
                        <Typography>Gravar Registro</Typography>
                    </Button>
                </Box>
            </Box>
        </Card >
    );
}
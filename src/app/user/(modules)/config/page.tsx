'use client';

import { useAuthContext } from "@/components/auth/AuthContext";
import { DefaultLoader } from "@/components/loading/DefaultLoader";
import ImageDropper from "@/components/shared/widgets/imageDropper/ImageDropper";
import { Alert, AlertColor, Avatar, Box, Button, Card, Divider, IconButton, InputAdornment, MenuItem, Modal, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import React, { useEffect } from "react";
import { ChangeEvent } from "react";
import Image from "next/image";
import { getProfileRepository } from "@/modules/firebase";
import { AllUserKinds } from "@/modules/firebase/models/UserKind";
import { Municipio, UF } from "@/modules/ibge/types";
import { getCidades, getUFs } from "@/modules/ibge/localidades";
import LoadingModal from "@/components/loading/LoadingModal";
import { changePassword } from "@/modules/firebase/services/auth";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
//       ^ código que importa o olhinho do Ant Design, também copiado de components/auth/LoginForm.tsx

interface ConfigSectionProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

function ConfigSection(props: ConfigSectionProps) {
    const { title, subtitle, children } = props;
    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={12} md={3} sx={{ pt: 1 }}>
                <Typography variant="h5" color='primary'>{title}</Typography>
                {subtitle && (<Typography variant="body1">{subtitle}</Typography>)}
            </Grid>
            <Grid xs={12} md={9}>
                <Card sx={{ p: 3 }}>
                    {children}
                </Card>
            </Grid>
        </Grid>
    );
}

function ConfigSetting(props: ConfigSectionProps) {
    const { title, subtitle, children } = props;

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid xs={12} lg={3} sx={{ pt: 1 }}>
                <Typography variant="h6" color='primary'>{title}</Typography>
                {subtitle && (<Typography variant="body1">{subtitle}</Typography>)}
            </Grid>
            <Grid xs={12} lg={9}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {children}
                </Box>
            </Grid>
        </Grid>
    );
}

export default function UserConfigPage() {
    const { user, reloadUser } = useAuthContext();

    const [loading, setLoading] = React.useState(false);
    const [coverLoading, setCoverLoading] = React.useState(false);

    const [estados, setEstados] = React.useState<UF[] | null>(null);
    const [municipios, setMunicipios] = React.useState<Municipio[] | null>(null);

    const [nome, setNome] = React.useState<string>(user!.firstName);
    const [sobrenome, setSobrenome] = React.useState<string>(user!.lastName);
    const [email, setEmail] = React.useState<string>(user!.email);

    const [selectedUf, setSelectedUf] = React.useState<number>(user!.profile.ufId ?? 0);
    const [selectedMunicipio, setSelectedMunicipio] = React.useState<number>(user!.profile.municipioId ?? 0);

    const [intro, setIntro] = React.useState<string>(user!.profile.introText ?? '');

    const [senhaAnterior, setSenhaAnterior] = React.useState<string>('');
    const [novaSenha, setNovaSenha] = React.useState<string>('');
    const [confirmaSenha, setConfirmaSenha] = React.useState<string>('');

    const [showPasswordSenhaAnterior, setShowPasswordSenhaAnterior] = React.useState(false);
    const [showPasswordNovaSenha, setShowPasswordNovaSenha] = React.useState(false);
    const [showPasswordConfirmarSenha, setShowPasswordConfirmarSenha] = React.useState(false);

    const [alertaSenha, setAlertaSenha] = React.useState<string>('');
    const [tipoAlerta, setTipoAlerta] = React.useState<AlertColor>();

    useEffect(() => {
        const loadEstados = async () => {
            const estados = await getUFs();
            setEstados(estados);

            const initialUf = user!.profile.ufId ?? 0;

            if (initialUf > 0) {
                const municipios = await getCidades(estados!.filter(uf => uf.id == initialUf)[0]);
                setMunicipios(municipios);
            }
        }

        loadEstados();
    }, [user]);

    //const handleEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //    const email = event.target.value;
    //    setEmail(email);
    //}

    const handleEstadoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUf = parseInt(event.target.value);
        setSelectedUf(selectedUf);

        setSelectedMunicipio(0);

        const municipios = await getCidades(estados!.filter(uf => uf.id == selectedUf)[0]);
        setMunicipios(municipios);
    }

    const handleMunicipioChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMunicipio = parseInt(event.target.value);
        setSelectedMunicipio(selectedMunicipio);
    }

    const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        try {
            if (!e.target.files) {
                return;
            }
            const fileList = e.target.files;

            const profileRepo = await getProfileRepository(user!);
            await profileRepo.setProfilePhoto(fileList[0]);
            await reloadUser();
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarRemove = async () => {
        setLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            await profileRepo.removeProfilePhoto();
            await reloadUser();
        } finally {
            setLoading(false);
        }
    };

    const handleCoverUpload = async (file: File) => {
        setCoverLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            await profileRepo.setCoverPhoto(file);
            await reloadUser();
        } finally {
            setCoverLoading(false);
        }
    };

    const handleCoverRemove = async () => {
        setCoverLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            await profileRepo.removeCoverPhoto();
            await reloadUser();
        } finally {
            setCoverLoading(false);
        }
    };

    const handleBasicInfoSave = async () => {
        setLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            const uf = estados!.filter(uf => uf.id == selectedUf)[0];
            const municipio = municipios!.filter(municipio => municipio.id == selectedMunicipio)[0];
            await profileRepo.updateBasicInfo(nome, sobrenome, uf, municipio);
            await reloadUser();
        } finally {
            setLoading(false);
        }
    };

    const handleBioSave = async () => {
        setLoading(true);
        try {
            const profileRepo = await getProfileRepository(user!);
            await profileRepo.updateBio(intro);
            await reloadUser();
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setLoading(true);
        setAlertaSenha('');
        try {
            if (senhaAnterior === '' || novaSenha === '' || confirmaSenha === '') {
                setAlertaSenha('Não se esqueça de preencher todos os campos!');
                setTipoAlerta('error');
            } else if (novaSenha === confirmaSenha) {
                await changePassword(user!, senhaAnterior, novaSenha);
                setAlertaSenha('Sua senha foi alterada com sucesso!');
                setTipoAlerta('success');
                setSenhaAnterior('');
                setNovaSenha('');
                setConfirmaSenha('');
            } else {
                setAlertaSenha('Verifique se a confirmação de sua nova senha está correta!');
                setTipoAlerta('error');
            }
        } catch (error) {
            let mensagem = String(error);
            if (error instanceof Error) {
                mensagem = error.message;
            } 
            setAlertaSenha('Oops! Não foi possível alterar sua senha: ' + mensagem);
            setTipoAlerta('error');
        } finally {
            setLoading(false);
        }
    }

    // código de senha que eu peguei de components/auth/LoginForm.tsx
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // fim do código de senha que eu peguei de components/auth/LoginForm.tsx

    function showPassword(mostrou: boolean) {
        if (mostrou == true) {
            return "text";
        } else {
            return "password";
        }
    }

    /*
     * referencia:
     * Aplicacoes web real time com Node-js  Casa do Codigo
     */

    return (user &&
        <>
            <LoadingModal visible={loading} />
            <Typography variant="h3" color='primary' sx={{ mb: 1 }}>Configurações</Typography>
            <Divider sx={{ mb: 3 }} />

            <ConfigSection title="Perfil" subtitle="Informações do seu perfil público">
                <Typography variant="h5" color='primary' sx={{ mb: 2 }}>Personalização</Typography>

                <ConfigSetting title="Avatar">
                    <Avatar alt={user.fullName} src={user.photoURL} sx={{ mr: 2 }} />
                    <Button variant="outlined" color="primary" component="label">
                        Alterar
                        <input type="file" hidden onChange={handleAvatarUpload} />
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleAvatarRemove}>
                        Remover
                    </Button>
                </ConfigSetting>

                <ConfigSetting title="Capa">
                    <Box flexGrow={1}>
                        <ImageDropper image={user.profileCoverPhotoUrl} onDrop={handleCoverUpload} loading={coverLoading} />

                        <Box display="flex" justifyContent='space-between' sx={{ mt: 1 }}>
                            <Button variant="outlined" color="primary" onClick={handleCoverRemove}>
                                Usar padrão
                            </Button>
                        </Box>
                    </Box>
                </ConfigSetting>

                <Typography variant="h5" color='primary' sx={{ mt: 3, mb: 2 }}>Informações básicas</Typography>

                <ConfigSetting title="Nome">
                    <Grid container flexGrow={1} spacing={2}>
                        <Grid xs={12} sm={6}>
                            <TextField label="Nome" variant="filled" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField label="Sobrenome" variant="filled" fullWidth value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                        </Grid>
                    </Grid>
                </ConfigSetting>

                <ConfigSetting title="Perfil de Usuário">
                    <TextField
                        select
                        label="Perfil"
                        variant="filled"
                        fullWidth
                        value={user.profile.userKind}
                    >
                        {AllUserKinds.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </ConfigSetting>

                <ConfigSetting title="Email">
                    <TextField label="Email" variant="filled" fullWidth value={email} />
                </ConfigSetting>

                <ConfigSetting title="Localização">
                    <Grid container flexGrow={1} spacing={2}>
                        <Grid xs={12} sm={6}>
                            <TextField label="Estado" variant="filled" fullWidth select onChange={handleEstadoChange} value={selectedUf}>
                                {
                                    estados
                                        ? estados.map((estado) => (
                                            <MenuItem key={estado.id} value={estado.id}>
                                                {estado.nome} ({estado.sigla})
                                            </MenuItem>
                                        ))
                                        : (<MenuItem disabled>Carregando...</MenuItem>)
                                }
                            </TextField>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <TextField label="Município" variant="filled" fullWidth select onChange={handleMunicipioChange} value={selectedMunicipio}>
                                {
                                    municipios
                                        ? municipios.map((municipio) => (
                                            <MenuItem key={municipio.id} value={municipio.id}>
                                                {municipio.nome}
                                            </MenuItem>
                                        ))
                                        : (<MenuItem disabled>Selecione o estado</MenuItem>)
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                </ConfigSetting>

                <ConfigSetting>
                    <Button variant="outlined" color="primary" onClick={handleBasicInfoSave}>
                        Salvar
                    </Button>
                </ConfigSetting>


                <Typography variant="h5" color='primary' sx={{ mt: 3, mb: 2 }}>Sobre mim</Typography>

                <ConfigSetting title="Introdução">
                    <TextField label="Escreva algo sobre você" variant="filled" fullWidth multiline rows={5} value={intro} onChange={(e) => setIntro(e.target.value)} />
                </ConfigSetting>

                <ConfigSetting>
                    <Button variant="outlined" color="primary" onClick={handleBioSave}>
                        Salvar
                    </Button>
                </ConfigSetting>

            </ConfigSection>


            <ConfigSection title="Segurança" subtitle="Alteração de senha e autenticação de dois fatores">
                <Typography variant="h5" color='primary' sx={{ mb: 2 }}>Alteração de senha</Typography>
                {alertaSenha && <Alert severity={tipoAlerta} sx={{ mb: 2 }}>{alertaSenha}</Alert>}
                {/* Cada um dos campos contêm InputProps que adicionam o botão de olhinho no lado direito dos forms */}
                <ConfigSetting title="Senha anterior">
                    <TextField label="Informe sua senha anterior" variant="filled" fullWidth type={showPassword(showPasswordSenhaAnterior)}
                        value={senhaAnterior} onChange={(e) => setSenhaAnterior(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordSenhaAnterior(!showPasswordSenhaAnterior)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPasswordSenhaAnterior ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </ConfigSetting>

                <ConfigSetting title="Nova senha">
                    <TextField label="Informe sua nova senha" variant="filled" fullWidth type={showPassword(showPasswordNovaSenha)}
                        value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordNovaSenha(!showPasswordNovaSenha)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPasswordNovaSenha ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </ConfigSetting>

                <ConfigSetting title="Confirmação de senha">
                    <TextField label="Confirme sua nova senha" variant="filled" fullWidth type={showPassword(showPasswordConfirmarSenha)}
                        value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPasswordConfirmarSenha(!showPasswordConfirmarSenha)}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                >
                                    {showPasswordConfirmarSenha ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </ConfigSetting>

                <ConfigSetting>
                    <Button variant="outlined" color="primary" onClick={handleChangePassword}>
                        Alterar
                    </Button>
                </ConfigSetting>


            </ConfigSection>
        </>
    );
}

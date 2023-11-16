'use client';

import { useEffect, useState } from 'react';


// material-ui
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import { strengthColor, strengthIndicator } from '@/modules/utils/passwordStrength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { AnimateButton } from '../shared/elements/AnimatedButton';
import { useRouter } from 'next/navigation';
import { register } from '@/modules/firebase/services/auth';


type PasswordStrength = {
    label: string,
    color: string
}

export const RegisterForm = () => {
    const [level, setLevel] = useState<PasswordStrength>();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const router = useRouter();

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    company: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(255).required('Favor informar seu nome'),
                    lastname: Yup.string().max(255).required('Favor informar seu sobrenome'),
                    email: Yup.string().email('Favor informar um e-mail válido').max(255).required('Favor informar seu e-mail'),
                    password: Yup.string().max(255).required('Favor informar uma senha')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        await register(values.email, values.password, values.firstname, values.lastname);
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: String(err) });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Nome*</InputLabel>
                                    <OutlinedInput
                                        id="firstname-login"
                                        type="firstname"
                                        value={values.firstname}
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Mariane"
                                        fullWidth
                                        error={Boolean(touched.firstname && errors.firstname)}
                                    />
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="lastname-signup">Sobrenome*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastname && errors.lastname)}
                                        id="lastname-signup"
                                        type="lastname"
                                        value={values.lastname}
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Silva"
                                        inputProps={{}}
                                    />
                                    {touched.lastname && errors.lastname && (
                                        <FormHelperText error id="helper-text-lastname-signup">
                                            {errors.lastname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Endereço de e-mail*</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="email@exemplo.com.br"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item sx={{mr: 'auto'}}>
                                                Senha
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                            </Grid>
                                        </Grid>
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Senha"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    <span>Ao se cadastrar, você concorda com nossos </span>
                                    <Link variant="subtitle2" component={Link} href="#" color='secondary'>Termos de Uso</Link>
                                    <span> e nossa </span>
                                    <Link variant="subtitle2" component={Link} href="#" color='secondary'>Política de Privacidade</Link>
                                </Typography>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Cadastrar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};
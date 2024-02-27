'use client';

import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material"
import { AnimateButton } from "../shared/elements/AnimatedButton"
import React from "react";
import * as Yup from 'yup';
import { Formik, FormikBag, FormikValues } from "formik";
import { sendPasswordChangeEmail } from "@/modules/firebase/services/auth";
import { useRouter } from 'next/navigation';

export const PasswordRecoverForm = () => {
    const router = useRouter();

    return (
        <>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Deve ser e-mail válido').max(255).required('Favor fornecer seu e-mail')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        await sendPasswordChangeEmail(values.email);
                        router.push('recoverConfirmation');
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ email: String(err) });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-recuperar-senha">E-mail</InputLabel>
                                    <OutlinedInput
                                        id="email-recuperar-senha"
                                        type="email"
                                        name="email"
                                        placeholder="Informe seu email"
                                        value={values.email}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-recuperacao">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary" sx={{ marginBottom: 3 }}>
                                        Enviar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button fullWidth size="large" type="button" variant="outlined" color="secondary" href="/auth/login">
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            
        </>
    )
}
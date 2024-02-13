import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";


const RegisterPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Cadastre-se</Typography>
                    <Typography component={Link} href="/auth/login" variant="body1" sx={{ textDecoration: 'none' }} color="secondary">
                        Já se cadastrou?
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <RegisterForm />
            </Grid>
        </Grid>
    );
};

export default RegisterPage;
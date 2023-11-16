import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";


const LoginPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Login</Typography>
                    <Typography component={Link} href="/auth/register" variant="body1" sx={{ textDecoration: 'none' }} color="secondary">
                        Não tem uma conta? Cadastre-se
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <LoginForm />
            </Grid>
        </Grid>
    );
};

export default LoginPage;
// recoverConfirmation.js
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

const RecoverConfirmation = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    E-mail enviado!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Um e-mail de recuperação foi enviado para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary">
                    <Link href="/auth/login">
                        Voltar para o Login
                    </Link>
                </Button>
            </Grid>
        </Grid>
    );
};

export default RecoverConfirmation;

import { PasswordRecoverForm } from "@/components/auth/PasswordRecoverForm";
import { Grid, Stack, Typography } from "@mui/material"


const PasswordRecoverPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="column" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Esqueceu sua senha?</Typography>
                    <Typography paddingTop="2em">Para redefinir sua senha, informe o e-mail cadastrado na sua conta e iremos te enviar um link com instruções.</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PasswordRecoverForm />
            </Grid>
        </Grid>
    )
}

export default PasswordRecoverPage;
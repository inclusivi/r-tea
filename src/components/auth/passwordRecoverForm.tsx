import { Button, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material"
import { AnimateButton } from "../shared/elements/AnimatedButton"
import { Padding } from "@mui/icons-material"


export const PasswordRecoverForm = () => {
    return (
        <>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-recuperar-senha">E-mail</InputLabel>
                            <OutlinedInput
                                id="email-recuperar-senha"
                                type="email"
                                name="email"
                                placeholder="Informe seu email"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="primary" sx={{ marginBottom: 3 }}>
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
        </>
    )
}
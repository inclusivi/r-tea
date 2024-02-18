import { Button, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material"
import { AnimateButton } from "../shared/elements/AnimatedButton"

import React from 'react'

const PasswordResetForm = () => {
  return (
    <>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="new-password">Nova senha</InputLabel>
              <OutlinedInput
                id="new-password"
                type="password"
                name="new-password"
                placeholder="Informe sua nova senha"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor='confirmation-password'>Confirmação de senha</InputLabel>
              <OutlinedInput
                id="confirmation-password"
                type="password"
                name="confirmation-password"
                placeholder="Confirme sua nova senha"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <AnimateButton >
                <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button fullWidth size="large" type="button" variant="outlined" color="secondary" href="/auth/login">
                    Cancelar
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>

          

        </Grid>
      </form>
    </>
  )
}

export default PasswordResetForm
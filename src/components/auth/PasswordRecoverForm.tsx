import { Button, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { AnimateButton } from "../shared/elements/AnimatedButton";
import React from "react";

export const PasswordRecoverForm = () => {
  const [email, setEmail] = React.useState<string>("");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 3 }}
              >
                Enviar
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                fullWidth
                size="large"
                type="button"
                variant="outlined"
                color="secondary"
                href="/auth/login"
              >
                Cancelar
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

// const sendPasswordRecoverEmail = () => {
//   const auth = getAuth();
//   const email = document.getElementById("email-recuperar-senha");
//   sendPasswordResetEmail(auth, email)
//     .then(() => {
//       alert("Enviamos um link de recuperação de senha ao seu e-mail!");
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };

// Corpo do E-mail

/* <h2>Prezado ${"primeiro nome do usuário"},</h2>
<p>Nós recebemos um pedido para a mudança de senha de sua conta na R-TEA. Para alterar sua senha, siga o link abaixo:</p>

<p>Se você não fez este pedido, desconsidere este e-mail.</p>
<p>Nós desenvolvemos esse sistema para você e estamos sempre dispostos a receber seu feedback ou responder a suas perguntas.</p>
<p>Não responda a este e-mail.</p> */

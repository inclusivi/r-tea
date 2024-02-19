
import PasswordResetForm from "@/components/auth/PasswordResetForm"
import { Grid, Stack, Typography } from "@mui/material"

const PasswordResetPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Redefinir senha</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
          <PasswordResetForm />
      </Grid>
    </Grid>
  )
}

export default PasswordResetPage
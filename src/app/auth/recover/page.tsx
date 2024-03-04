'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid, Stack, Typography } from "@mui/material"

import PasswordResetForm from '@/components/auth/PasswordResetForm'


const RecoverPage = () => {
  const [isEmailCodeValid, setIsEmailCodeValid] = React.useState<Boolean>(true);

  const searchParams = useSearchParams();

  const oobCode = searchParams.get('oobCode');

  return (
    <>

    {/*  renderizar condicionalmente depedendo do resultado da validação */}
    {isEmailCodeValid && 
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Redefinir senha</Typography>
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <PasswordResetForm oobCode={oobCode!}/>
        </Grid>
      </Grid>}
    </>
  )
}

export default RecoverPage
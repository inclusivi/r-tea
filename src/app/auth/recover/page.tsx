'use client'

import React,  { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid, Stack, Typography } from "@mui/material"

import PasswordResetForm from '@/components/auth/PasswordResetForm'
import { validateActionCode } from '@/modules/firebase/services/auth'

const RecoverPage = () => {
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(true);
  const [isCodeChecking, setIsCodeChecking] = useState(true);
  const [oobCode, setOobCode] = useState('');
  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const checkCodeValidity = async () => {
      try {
        const oobCodeFromParams = searchParams.get('oobCode');
        if (oobCodeFromParams) {
          setOobCode(oobCodeFromParams);
          await validateActionCode(oobCodeFromParams);
          setIsEmailCodeValid(true);
        } else {
          setIsEmailCodeValid(false);
        }
      } catch (error) {
        setIsEmailCodeValid(false);
      } finally {
        setIsCodeChecking(false);
      }
    };
    
    checkCodeValidity();
  }, [searchParams]);

  return (
    <>
      {isCodeChecking ? (
        <Typography variant="body1">Verificando código...</Typography>
      ) : isEmailCodeValid ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3">Redefinir senha</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <PasswordResetForm oobCode={oobCode}/>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Código inválido.</Typography>
      )}
    </>
  )
}

export default RecoverPage

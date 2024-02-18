'use client'

import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from "@mui/material"
import { AnimateButton } from "../shared/elements/AnimatedButton"

import * as Yup from 'yup';
import { Formik } from 'formik';


import React from 'react'

const PasswordResetForm = () => {
  return (
    <>
    <Formik
        initialValues={{
          password: '',
          confirmationPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          password: 
            Yup.string()
            .max(255)
            .required('Favor fornecer sua senha'),
          confirmationPassword: 
            Yup.string()
            .max(255)
            .oneOf([Yup.ref('password'), ''], 'As senhas precisam ser iguais')
            .required('Favor confirmar sua senha')
          
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: String(err) });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
           <form noValidate onSubmit={handleSubmit}>
           <Grid container spacing={3}>
             <Grid item xs={12}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="new-password">Nova senha</InputLabel>
                 <OutlinedInput
                   id="new-password"
                   type="password"
                   name="password"
                   placeholder="Informe sua nova senha"
                   value={values.password}
                   onBlur={handleBlur}
                   onChange={handleChange}
                   fullWidth
                   error={Boolean(touched.password && errors.password)}
                 />
                 {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-new-password">
                      {errors.password}
                    </FormHelperText>
                  )}
               </Stack>
             </Grid>
   
             <Grid item xs={12}>
               <Stack spacing={1}>
                 <InputLabel htmlFor='confirmation-password'>Confirmação de senha</InputLabel>
                 <OutlinedInput
                   id="confirmation-password"
                   type="password"
                   name="confirmationPassword"
                   placeholder="Confirme sua nova senha"
                   value={values.confirmationPassword}
                   onBlur={handleBlur}
                   onChange={handleChange}
                   fullWidth
                   error={Boolean(touched.confirmationPassword && errors.confirmationPassword)}
                 />
                 {touched.confirmationPassword && errors.confirmationPassword && (
                    <FormHelperText error id="standard-weight-helper-text-confirmation-password">
                      {errors.confirmationPassword}
                    </FormHelperText>
                  )} 
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
                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="button" variant="outlined" color="secondary" href="/auth/login">
                       Cancelar
                   </Button>
                 </AnimateButton>
               </Stack>
             </Grid>
   
             
   
           </Grid>
         </form>

        )}

      </Formik>
     
    </>
  )
}

export default PasswordResetForm
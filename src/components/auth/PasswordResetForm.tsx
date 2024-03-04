'use client'

import React from 'react'

import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Box, Typography, InputAdornment, IconButton, Alert } from "@mui/material"
import { AnimateButton } from "../shared/elements/AnimatedButton"

import * as Yup from 'yup';
import { Formik } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { strengthColor, strengthIndicator } from '@/modules/utils/passwordStrength';
import { resetPassword } from '@/modules/firebase/services/auth';


type PasswordStrength = {
    label: string,
    color: string
}

interface PasswordResetFormProps {
  oobCode: string;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ oobCode }) => {

  const [level, setLevel] = React.useState<PasswordStrength>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = React.useState(false);
    
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmationPassword = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  React.useEffect(() => {
    changePassword('');
  }, []);


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
            await resetPassword(oobCode, values.password)
            setSubmitting(false);
            setStatus({ success: true });
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: String(err.message) });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, status }) => (
           <form noValidate onSubmit={handleSubmit}>
           <Grid container spacing={3}>
             <Grid item xs={12}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="new-password">
                    <Grid container spacing={2} alignItems="center">
                      <Grid item sx={{mr: 'auto'}}>
                          Senha
                      </Grid>
                      <Grid item>
                          <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                          </Typography>
                      </Grid>
                      <Grid item>
                          <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                    </Grid>
                  </InputLabel>
                 <OutlinedInput
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Informe sua nova senha"
                    value={values.password}
                    onBlur={handleBlur}
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                          >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton  >
                      </InputAdornment>
                  }
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
                   type={showConfirmationPassword ? 'text' : 'password'}
                   name="confirmationPassword"
                   placeholder="Confirme sua nova senha"
                   value={values.confirmationPassword}
                   onBlur={handleBlur}
                   onChange={handleChange}
                   fullWidth
                   error={Boolean(touched.confirmationPassword && errors.confirmationPassword)}
                   endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle confirmation password visibility"
                            onClick={handleClickShowConfirmationPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                        >
                            {showConfirmationPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton  >
                    </InputAdornment>
                }
                 />
                 {touched.confirmationPassword && errors.confirmationPassword && (
                    <FormHelperText error id="standard-weight-helper-text-confirmation-password">
                      {errors.confirmationPassword}
                    </FormHelperText>
                  )} 
               </Stack>
             </Grid>

             {errors.submit && (
                <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              {status && status.success && (
                <Grid item xs={12}>
                  <Alert severity="success" variant='outlined'>Senha redefinida com sucesso.</Alert>
                </Grid>
              )}
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
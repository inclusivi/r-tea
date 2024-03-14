'use client';
import { useAuthContext } from "../auth/AuthContext";
//importa tag <Alert> (alerta) da biblioteca  MUI
import { Alert } from "@mui/material";
//inporta input preformataod no cSS do Mui  doa Blibloteca
import { Input } from '@mui/base/Input';
//
export function inputtipoconvite ()
{
  return <Input type="email" id="emailconvite" name="emailconvite" /> 
   
}

export default function ConviteAceito() {
const { userCtx } = useAuthContext();

    return (
   <center>
  <Alert severity="success">
  Convite foi aceito
  </Alert>
  </center>
  
  );
}
//https://mui.com/material-ui/react-alert/
//https://mui.com/base-ui/react-input/
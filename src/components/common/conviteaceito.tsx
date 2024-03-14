'use client';

import { useAuthContext } from "../auth/AuthContext";

//importa tag <Alert> (alerta) da biblioteca  MUI
import { Alert } from "@mui/material";

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
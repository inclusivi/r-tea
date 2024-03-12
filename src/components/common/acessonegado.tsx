"use client";
import Alert from "@mui/material/Alert";
//bibloteca tem a uma tag pre consitruoida que fgera html alerta
export default function AcessoNegado() {
  //pagina de acesso negador no menu que troia ca de tipo de usuario
  return (
    <center>
      <Alert severity="info">Acesso Negado</Alert>
    </center>
  );
}

//https://mui.com/material-ui/react-alert/#severity

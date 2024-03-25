'use client';
import { useAuthContext } from "../auth/AuthContext";
//importa tag <Alert> (alerta) da biblioteca  MUI
import { Alert } from "@mui/material";
//inporta input preformataod no cSS do Mui  doa Blibloteca
import { Input } from '@mui/base/Input';



export function enviarconvite ()
{
 
 
  
  //enviar email e convite
  
  //e-amil da da pessoa convidada
  let para =""

  //assunto da mensagem enviada
  let assunto ="convidate à R-TEA "
  
  
  //texto da mensagem enviada por e-mail
  let nome='' 
  const mensagemtextosoRogereEdu=`
  
  Olá, Sr(a) ${nome}!
  
  Você foi convidado(a) à R-TEA, uma plataforma de tratamento de pessoas autistas. Este convite foi enviado(a) por um(a) paciente, diagnosticado(a) com autismo ou em jornada de descoberta e este(a) escolheu o senhor(a) para participar da plataforma e entrar em contato contigo através desta. Para tal, é necessário registrar uma conta na plataforma R-TEA.
  
   Siga o link abaixo para seguir à página de registro:
  
  Uma vez nessa pagina, selecione a opção 'Profissional de Saúde' e preencha suas informações profissionais em seu perfil.
  
  `
  //códiog do convite enviado

   
   //if (condition==true) {
     
    return (
      //alerta de convite enviado usadno o bjeto Alert pre construido de bibliopteca Mui
      <center>
     <Alert severity="success">
     Convite foi enviado
     </Alert>
     </center>
     
     );
   //} else {
   // return "convite com em construção site em manutenção ou deu erro"  
   //}
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
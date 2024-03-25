'use client';
import { useAuthContext } from "../auth/AuthContext";
//importa tag <Alert> (alerta) da biblioteca  MUI
import { Alert } from "@mui/material";
//inporta input preformataod no cSS do Mui  doa Blibloteca
import { Input } from '@mui/base/Input';



export function gravardados ()
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
     Convite foi salvo
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
/*
import firebase from 'firebase/app';
import 'firebase/firestore';
*/
/// Inicialize o Firebase
/*if (!firebase.apps.length) {
  firebase.initializeApp({
    // Sua configuração do Firebase
  });
}

// Obtenha uma referência para o banco de dados
const db = firebase.firestore();

// Adicione um novo documento com um ID gerado automaticamente
db.collection("minhaColecao").add({
    campo1: "valor1",
    campo2: "valor2",
})
.then((docRef) => {
    console.log("Documento escrito com ID: ", docRef.id);
})
.catch((error) => {
    console.error("Erro ao adicionar documento: ", error);
});

//https://mui.com/material-ui/react-alert/
//https://mui.com/base-ui/react-input/
https://firebase.google.com/codelabs/firebase-nextjs
https://firebase.google.com/codelabs/firebase-nextjs
https://makerkit.dev/docs/next-fire/reading-data-storage
https://dev.to/reeshee/how-to-use-firebase-storage-to-upload-and-retrieve-files-in-nextjs-pages-router-2p16
https://makerkit.dev/docs/next-fire/reading-data-storage
https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/
https://www.freecodecamp.org/news/create-full-stack-app-with-nextjs13-and-firebase/
https://stackoverflow.com/questions/59297604/how-to-use-firebase-cloud-firestore-database-in-a-next-js-project-how-to-initia
https://blog.logrocket.com/nextjs-cloud-firestore-full-stack-app-tutorial/
//import { grid2Classes } from "@mui/material"
//import { frFR } from "@mui/material/locale"
//import { trTR } from "@mui/x-data-grid"
//creted by Eduardo S. C. form SP/BR

  const menusome = `
<script>
const menumaeautismo= document.getElementsByClassName("MuiDrawer-paper")
menumaeautismo[0]

//apaga a divisorio ,tudo dentro dela
menumaeautismo[0].innerText=""

//apaga clases que definem fundo preto pro menu
menumaeautismo[0].removeChild("MuiPaper-root")
menumaeautismo[0].classList.remove("mui-1evlaxh")
</script>
`
/*

import './globals.css'
import { AuthContextProvider } from '@/components/auth/AuthContext'
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import { darkTheme } from '@/components/theme/default'
import type { Metadata } from 'next'
//ternario consifççaõ se verdadeiro
*/
// gera script no Frointed que  apga erro do no fornte apaga o menu





//correção de  bugs com string


  function fecharmenudependentes(usuarioautista, menucomando) {
  //:boolean converte pra texto pra evitar erro doutro valores
  usuarioautista=String(usuarioautista)
  
  if (usuarioautista == "true") {
    //se usuairo for autista injeta Javascript no Frointeed pra apagar o menu
    return menucomando
  }
  if (usuarioautista == "false") {
    
    return "O usuario não é autista"
  }
  // pra ser exportad
export fecharmenudependentes

  //se valor invçlido for um numero,ou texot com aspas
 else {//se valor invlaido 

return "Valor inválido: "+usuarioautista
  }



}
//tentar executar a funçao pra apagar o menu 
try {//tanto faz ovtrue or false se for do tipo fatexto o boleano
  console.log(fecharmenudependentes(true, menusome))
} 
catch (error) {
 //se erro avisar oque é 
 console.error("Deu erro texto sem aspas "+error)
   
}


//referencias
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
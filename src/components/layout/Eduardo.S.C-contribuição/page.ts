//import { grid2Classes } from "@mui/material"
//import { frFR } from "@mui/material/locale"
//import { trTR } from "@mui/x-data-grid"
//creted by Eduardo S. C. form SP/BR
//import './globals.css'
//import { AuthContextProvider } from '@/components/auth/AuthContext'
//import ThemeRegistry from '@/components/theme/ThemeRegistry'
//import { darkTheme } from '@/components/theme/default'
//import type { Metadata } from 'next'


console.log("script conectado")

//ag a 
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


//exibi r vairiavel que contem o menu
//console.log(menusome)
//se usuario é autista exiba código script de jkavascriptpra apgar menu

console.log(fecharmenudependentes(true, menusome))
//erro aqui trava o R-tea somente true ou false como boleenao ou string tamnto faz
/*


//ternario consifççaõ se verdadeiro
*/
// gera script no Frointed que  apga erro do no fornte apaga o menu





//correção de  bugs com string


//module.exports=

function fecharmenudependentes(usuarioautista:String, menucomando) {
  //:boolean converte pra texto pra evitar erro doutro valores
  usuarioautista=String(usuarioautista)
  
  if (usuarioautista == "true") {
    //se usuairo for autista injeta Javascript no Frointeed pra apagar o menu
    
    return  menucomando

  }
  if (usuarioautista == "false") {
    
    return "O usuario não é autista"
  }
  // pra ser exportad
 //fecharmenudependentes()

  //se valor invçlido for um numero,ou texot com aspas
else {
//se valor invalido 
//tratamento de erro pra naõ travar o site
return `Valor inválido:`
  }



}


/** correção de bug
//tentar executar a funçao pra apagar o menu 

**/
//referencias/
//Aplicacoes Web Real Time com Node-js editora Casa do Codigo
//https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
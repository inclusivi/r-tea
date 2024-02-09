//forçar pagina como https pra tcc PQ ORIENTADOR Maxsuel insistiu que da pra  interceptar http e https

var linha0 = ""

function httpsforce(){



//aqui o cookie é usado comoi controle pra evitar que  a pagian fique em loop carregando a mensagem
//docmunet.cookie é criador de cookies

var x=prompt("Ativar HTTPS:(S/N)?","aperte ok pra ativar https")
//só redireciona pra protocolo https pq criptografodo com certificado digitar S
//independente de letra minusciula e mauiusicula
if(x.upperCase="S"){
location.protocol="https"
document.cookie="HTTPS ativado"

}

alert(document.cookie)



}
//fim de forçar pagina como https 




0//pra começar atribua 
//const newLocal = document.getElementsByTagName('input')
//atribua valor ids de campo a campo7

//configurando teclado da calculador
//uisso tlavez será minha exten~soa entçã~n~esse caso naã ofuncioanara console
//function configteclado(){
	
	//this é este no inlês
//document.getElementById("campo").value=this.value

// document.getElementById
//documento.receber por ID serve pra alterar valore s e pegar valores semlheante ao nome.atributo de macro do  Officee


/*function configteclado(tecla){
 var  a=tecla;
//faz  o teclado da calculadora  funcionar
document.getElementById("campo").value=document.getElementById("campo").value + a;

}*/

//configuraçõespra calculadoprateclas de calculadora pq esse arquvio eé de reuso

function calculador() {
	if (document.getElementById("campo").value[1] == "+") {
		var resultado = Number(document.getElementById("campo").value[0]) + Number(document.getElementById("campo").value[2])
	}
	if (document.getElementById("campo").value[1] == "-") {
		var resultado = Number(document.getElementById("campo").value[0]) - Number(document.getElementById("campo").value[2])
	}
	if (document.getElementById("campo").value[1] == "/") {
		var resultado = Number(document.getElementById("campo").value[0]) / Number(document.getElementById("campo").value[2])
	}
	if (document.getElementById("campo").value[1] == "*") {
		var resultado = Number(document.getElementById("campo").value[0]) * Number(document.getElementById("campo").value[2])
	}

	//pegando data e hora
	var data = new Date()
	//é o truqe que pega letra por letra deuma frase em javascript semelhate a matrix  

	//define apelidos por id  
	//no caso tag com id campo de campo,
	//tem assim idem o campo,campo2 ao campo6 
	//assim se pode chamar  campo.value pra valor do inpu e os demias tatirbutos delel
	//as variaveis txt,txt2 ao txt6 pq era pra redicirecionar a pagina pra usar o metodo $_GET,
	//mas,o <form method="GET" action="(quaquer coisa).php"> já faz a mesma coisa e melhor.
	function gerarTexto() {
		//gera texto pra opção de garar senha 
		return opcoes[Math.floor(Math.random() * (opcoes.length))]
	}/corrigindo bug pra que varivel funcioe o apelifdo pro s campos corretamente/
	var camposebotões = document.getElementsByTagName('input')


	var campo = document.getElementById("campo")
	var txt = "&b=";
	var campo2 = document.getElementById('campo2');
	var txt2 = "&c=";
	var campo3 = document.getElementById('campo3');
	var txt3 = "&d=";
	var campo4 = document.getElementById('campo4');
	var txt4 = "&e=";
	var campo5 = document.getElementById('campo5');
	var txt5 = "&f=";
	var campo6 = document.getElementById('campo6');
	var txt6 = "&g=";
	var campo7 = document.getElementById('campo7');
	var campo8 = document.getElementById('campo8');
	var pagina = document.getElementById('corpo');
	//contar caixas de textoe usa-las
	var caixadetexto = document.getElementsByTagName("textarea")
	//lendo cookies 
	var meuscookies = document.cookie()

	//pagina recebe  valor docampo corpo que é pra ser o id do body

	//variavole nessecessaria pras funções gerar texto e gerar senha funcionarem





	//gerar senha forte depende de gerar texto 
	function gerarsenhaforte() {
		return gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto()
	}


	//imprimir Tag expecifica 
	//deveser usada imprimirtag(Id da tag.value ou tag.innerHTml dependendo da tag  )


	//quando: quando chamando pelos eventos onclick,onchange
	//oque faz: imprmir TAg 
	function imprimirtag(IDcampo, idbody) {
		//como imprimirTag 
		var oqueimprimir = document.getElementById(textocampo);
		//escrevendo na tela o texto daquela tag 
		//gera pagian em branco	
		//aqui reccebe a pagian pelo id da tag body(corpo da pagina)
		document.getElementsByTagName('body').corpo.innerHTML = campo.value
		window.print()
		//´presumindo que campo é id doa tag o id de body é corpo 
	}
	//porque para TCCc salvar como pdf ou imprmir poi o trea lista de regra de bloqueio 






	//testando script externo
	//essa linha tem que ser deixada no final do arquvio pois se qualauer código antes de erro ela nã ofuncioan e saberei que tem problema


	//function mimandmaxnumber(mim) {
	// se campo.value(valor )<minimo ou maior que o máximo 
	//checa se esta peergunta pro python se está tudo bem

	//função(oque) sairxampp() é o que mostra a tela 4 (opção sair) 
	function sairxampp() {
		document.write("Vc está saiu")
		location.href = "http://localhost"
	}

	//configuração de segurnaça pra http não ter dados digitando interncertpados(furtados) por hackers crimniosos,ameniza,mas só impde com https vide snffir de rede
	//form.encoding='text/multipart';
	//fim configuração de segurança




	//define toda tag de id campo,campo2 ao campo7 como campo obrigatório
	//recebe todos os input sejam eles botões ou campos
//reuqer Jquery



	campo.required = true;
	campo2.required = true;
	campo3.required = true;
	campo4.required = true;
	campo5.required = true;
	campo6.required = true;
	campo7.required = true;

	//campo4.required=true 
	//define autocomplete como padrão pra id campo, campo2 ao campo4
	campo.autocomplete = 'on'
	campo2.autocomplete = 'on';
	campo3.autocomplete = 'on'
	//campo4.autocomplete='on'


	//document.cookie(Date())

	//injetando html no menu pra ele ter evento intnerno nosubmeter

	var form = document.getElementById("menu")


	//recebe todos os quadros externos sejam eles.
	var iframe = document.getElementsByTagName('iframe')
	//pra linhas abbaixo avisam se scripot estiver funcionado corretmaente
	var opcoes = '&*%@!#$¨úóçáabcdehfglsnmopqsrpqxyz';

	function gerarTexto() {
		//gera texto pra opção de garar senha 

		return opcoes[Math.floor(Math.random() * (opcoes.length))]
	}
	//gerar senha forte depende de gerar texto 
	function gerarsenhaforte() {
		return gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto() + gerarTexto()
	}
	console.log("made in Brazil")
	console.log("Script calculadora.js ok")

	//preparafuncçaode javascript externo defiinido  onchage de campo como campo_onchange()
	//campo.onchange=campo_onchange()
	//referências do código
	//https://getbootstrap.com.br/docs/4.1/components/forms/
	//developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_Operators#operador_condicional_ternario
	//https://pt.stackoverflow.com/questions/112862/valida%c3%a7%c3%a3o-de-campos-javascript#:~:text=Com%20javascript%20puro%20crie%20uma%20fun%C3%A7%C3%A3o%20e%20chame,ent%C3%A3o%20%C3%A9%20poss%C3%ADvel%20validar%20eles%20dessa%20forma%20form.campo.value
	//https://acervolima.com/como-mostrar-todos-os-erros-em-php/#:~:text=Como%20mostrar%20todos%20os%20erros%20em%20PHP%3F%20Podemos,retornar%C3%A1%20o%20n%C3%ADvel%20de%20relat%C3%B3rio%20de%20erro%20atual.
	//https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Cookies
	//https://www.youtube.com/watch?v=iVkSlNNShsk&ab_channel=ProgramadorBR
	//Desenvolva%20jogos%20com%20HTML5%20Canvas%20e%20JavaScript%20by%20Éderson%20Cássio%20
}
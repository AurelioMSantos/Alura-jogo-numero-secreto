
// para evitar de uma serie de repetições, criamos uma função para reescrever toda vez que for chamada.
// sempre que seguir esse mesmo padrão:
/* let titulo = document.querySelector('h1'); // pego o titulo pelo doc.query (h1)
*  titulo.innerHTML = 'Jogo do numero secreto'; // reescrevo o html
*  let paragrafo = document.querySelector('p'); //manipulando o html 
*  paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';
*/

//atentar a ordem das variaveis criadas
let listaDeNumerosSorteados = []; //aqui vai acumular os numeros que já sairam
let numMaximo = 10; //cria uma variavel para controlar as repetições no codigo
let numeroGerado = gerarNumAleatorio(); // chama a função e armazena 
let tentativa = 1;


function escreverNaTela(tag, texto){
    let titulo = document.querySelector(tag); // segue o mesmo padrão
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // a função speak só funciona se importar bibliotecas atraves do script
}
function msgInicial(){ //para não ter repetiçao de codigo
    escreverNaTela('h1', 'Jogo do numero secreto'); //chamando a função
    escreverNaTela('p', `Escolha um numero entre 1 e ${numMaximo}`);
}
msgInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // pegue o valor na entrada digitada

    if(chute == numeroGerado){ //obeservar ordem dos fatos
        escreverNaTela('h1', 'Acertou.');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let msgParaQuandoAcertar = `Parabéns, voce acertou em ${tentativa} ${palavraTentativa}`;
        escreverNaTela('p', msgParaQuandoAcertar); // o html não entende uma tample string direto na tela, por isso precisa mudar
        document.getElementById('reiniciar').removeAttribute('disabled'); //habilitando o btn reiniciar o novo jogo
    } else {
        if( numeroGerado > chute) {
            escreverNaTela('p', ' O numero é maior')
        } else {
            escreverNaTela('p', 'O numero é menor')
        }
        tentativa++;
        limparOCampo();
    }
    
}

function gerarNumAleatorio() { // precisa do return para exibir o numero gerado
    //return parseInt(Math.random() * 10 + 1);
    let numeroEscolhido = parseInt(Math.random() * numMaximo + 1);
    let qntElementosNaLista = listaDeNumerosSorteados.length; // verifica se a qnt é a mesma do numero total disponivel de numeros

    if(qntElementosNaLista == numMaximo){ //se a quantidade da lista for maxima ela reseta.
        listaDeNumerosSorteados = []; //array vazio
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ //na lista de numeros sorteado está incluso o numero escolhido, armazena para não sair mais
        return gerarNumAleatorio(); //recursão, a função chama ela mesmo. Nao é muito usual em programas grandes.
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //adc o numero escolhido na lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
    
}

function limparOCampo(){ //lembrar de chamar a função
    chute = document.querySelector('input'); // pegue o valor do input 
    chute.value = ''; //reescreva o valor 
} 

function reiniciarJogo(){
    numeroGerado = gerarNumAleatorio();
    limparOCampo();
    tentativa = 1;
    msgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);//habilitando o  novo jogo apenas quando acertar
    //ler-se: pegue o elemento reiniciar e set o atributo desabled como verdadeiro
}
/* aplicar o use strict (modo estrito) no inicio do arquivo js, exibe erros ao longo da codificação, fica mais fácil corrigir. */

'use strict';

/* aplicar a const no início da codificação para informar que as variáveis terão um valor fixo, uma constante somente leitura
o que significa que não poderá alterar ou retribuída */

/* Criar variavel para capturar informação digitada na calculadora. */

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

/* aplicar-se a let no início da codificação */

let novoNumero = true; /* let novoNumero será true, porque no inicio tem que ser um novo número */
let operador; /* let operador guardar o operador */
let numeroAnterior; /* let numeroAnterior guardar o numero */

/* este metodo verifica se o operador é diferente de undefined */
const operacaoPendente = () => operador !== undefined;

/* este metodo verifica se existe operações pendentes e executa (obs: .replace(',','.') este metodo significa que achar a virgula e troca por ponto )  */
const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.')); /*.replace(',','.') este metodo significa que achar a virgula e troca por ponto  */
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}
/* este metodo atualiza o display da calculadora */
const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR'); /* .toLocaleString("BR") metodo para mostrar no display o simbolo decimal utilizado no Brasil */
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('BR'); /* .toLocaleString("BR") metodo para mostrar no display o simbolo decimal utilizado no Brasil */
    }
}
/* metodo para inserir numero ao ser clicado */
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click', inserirNumero));

/* metodo para inserir operador evento */
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.')); /* utilizou .replace para achar a virgula e substituir por ponto */
    }
}

/* aplica forEach (ao clicar no numero e adiciona este numero a um evento ) */

operadores.forEach (operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', ativarIgual);

/* metodo para limpar o calculo e permitir que o novo numero seja inserido após limpar o display */
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

/* metodo (backspace) , para remover o ultimo numero digitado, foi utilizado o slice para retornar a string ( metodo de array) */
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

/* metodo para inverter o sinal da calculadora */
const inverterSinal = () => {
    novoNumero = true
    atualizarDisplay (display.textContent * -1);
}

document.getElementById('inverter').addEventListener('click', inverterSinal);

/* metodo para casas decimais (!== significa diferente de ) */
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);

/* variavel do teclado da calculadora */
const mapaTeclado = {
    '0'         : 'tecla0',
    '1'         : 'tecla1',
    '2'         : 'tecla2',
    '3'         : 'tecla3',
    '4'         : 'tecla4',
    '5'         : 'tecla5',
    '6'         : 'tecla6',
    '7'         : 'tecla7',
    '8'         : 'tecla8',
    '9'         : 'tecla9',
    '/'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    'Enter'     : 'igual',
    'Backspace' : 'backspace',
    'c'         : 'limparDisplay',
    'Escape'    : 'limparCalculo',
    ','         : 'decimal'
}

/* metodo  para verificar as teclas permitidas */
const mapearTeclado = (evento) => {
    const tecla = evento.key; /* para trazer o zero */
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1; /* Object.keys extrae do objeto somente as chaves um array e retorna os valores que deseja ser verificado .indexOf para verificar se existe a tecla !==(diferente) -1 */
  
  if (teclaPermitida())  document.getElementById(mapaTeclado[tecla]).click();
}
/* metodo para buscar o mapateclado diretamento do html */
document.addEventListener('keydown', mapearTeclado);

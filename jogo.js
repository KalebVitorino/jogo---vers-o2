//gerenciando Importações
import { desenharInimigos, criandoInimigos, posicionarInimigos, testeInimigo, moverInimigos, estrategiaInimigos } from "./inimigo.js";
import { ataquePersonagem, desenharPersonagem, movimentarPersoangem, testePersonagem } from "./personagem.js";


//gerenciando o Canvas
export var meuCanvas = document.getElementById("meu-canvas");
export var contexto = meuCanvas.getContext("2d");


//gerenciar os Estágios do jogo
var quantidadeEstagios = 7; //recomendado ==> 7
var estagio = quantidadeEstagios;

function gerenciarJogo () {
    estagio--;

    if (estagio <= 0) {
        estagio = quantidadeEstagios;
    }
}


//fazendo o jogo Rodar a Animação
function rodarJogo () {
    gerenciarJogo();

    if (estagio === 1) {
        contexto.clearRect(0, 0, meuCanvas.width, meuCanvas.height);
        
        //sobre o Personagem
        desenharPersonagem();
        movimentarPersoangem();
        ataquePersonagem();

        //sobre o Inimigo
        criandoInimigos();
        posicionarInimigos();
        desenharInimigos();
        estrategiaInimigos();
        moverInimigos();
        
    }

    //testes
    testeInimigo();
    
    requestAnimationFrame(rodarJogo);
}

rodarJogo();
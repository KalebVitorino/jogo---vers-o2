//gerenciando as Importações
import { meuCanvas, contexto } from "./jogo.js";


//criando as Caracteristcias do personagem
export var personagem = {
    x: 70,
    y: 80,
    largura: 25,
    altura: 60,
    imagens: {
        paradoEsquerda: new Image(),
        paradoDireita: new Image(),
        correndoEsquerda: new Image(),
        correndoDireita: new Image(),
        atacandoEsquerda: new Image(),
        atacandoDireita: new Image()
    }
}

personagem.imagens.paradoEsquerda.src = "./imagens/personagem/paradoEsquerda.png";
personagem.imagens.paradoDireita.src = "./imagens/personagem/paradoDireita.png";
personagem.imagens.correndoEsquerda.src = "./imagens/personagem/correndoEsquerda.png";
personagem.imagens.correndoDireita.src = "./imagens/personagem/correndoDireita.png";
personagem.imagens.atacandoEsquerda.src = "./imagens/personagem/atacandoEsquerda.png";
personagem.imagens.atacandoDireita.src = "./imagens/personagem/atacandoDireita.png";


//fazendo o Desenho
var xImagem =  0;

export function desenharPersonagem () {

    //desenhando o personagem Parado e Correndo
    if (tempoAtaque > 0) {
        //fazendo o ataque
        if (posicaoPersonagem.esquerda) {
            contexto.drawImage(personagem.imagens.atacandoEsquerda, xImagem*60, 0, 60, 60, personagem.x  - 35, personagem.y, 60, 60);
            animacaoSprites(3);
        }else if (posicaoPersonagem.direita) {
            contexto.drawImage(personagem.imagens.atacandoDireita, xImagem*60, 0, 60, 60, personagem.x, personagem.y, 60, 60);
            animacaoSprites(3);
        }
    }else if (teclasArmazenadas.paraEsquerda) {
        //andando para esquerda
        contexto.drawImage(personagem.imagens.correndoEsquerda, xImagem*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);
        animacaoSprites(5);
    }else if (teclasArmazenadas.paraDireita) {
        //andando para direita
        contexto.drawImage(personagem.imagens.correndoDireita, xImagem*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);
        animacaoSprites(5);
    }else if (posicaoPersonagem.esquerda && !teclasArmazenadas.paraEsquerda) {
        //parado para a esquerda
        contexto.drawImage(personagem.imagens.paradoEsquerda, xImagem*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);
        animacaoSprites(5);
    }else if (posicaoPersonagem.direita && !teclasArmazenadas.paraBaixo) {
        //parado para a direita
        contexto.drawImage(personagem.imagens.paradoDireita, xImagem*25, 0, 25, 60, personagem.x, personagem.y, 25, 60);
        animacaoSprites(5);
    }

}

function animacaoSprites (duracao) {
    
    xImagem++;
    
    if (xImagem >= duracao) {
        xImagem = 0;
    }
}   


//fazendo o Movimento
export function movimentarPersoangem () {
    if (tempoAtaque === 0 || tempoAtaque === undefined) {
        if (teclasArmazenadas.paraEsquerda) {
            personagem.x -= 2;
        }else if (teclasArmazenadas.paraDireita) {
            personagem.x += 2;
        }
    }
}

export function ataquePersonagem () {
    
    if (tempoAtaque > 0) {
        tempoAtaque--;
        permissaoAtaque = false;
    }else if (!teclasArmazenadas.espaco && tempoAtaque <= 0) {
        permissaoAtaque = true;
    }

}


//coletando a Posição e os Movimentos
var teclasArmazenadas = {
    paraEsquerda: false,
    paraDireita: false,
    paraCima: false,
    paraBaixo: false,

    espaco: false
}

var posicaoPersonagem = {
    esquerda: false,
    direita: true
}

//var tempoAtaque = 5;
var permissaoAtaque = true;
var tempoAtaque;
var duracaoAtaque = 3;

document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowLeft") {
        posicaoPersonagem.esquerda = true;
        posicaoPersonagem.direita = false;
        teclasArmazenadas.paraEsquerda = true;
    }else if (evento.key === "ArrowRight") {
        posicaoPersonagem.direita = true;
        posicaoPersonagem.esquerda = false;
        teclasArmazenadas.paraDireita = true;
    }

    if (evento.key === "ArrowUp") {
        teclasArmazenadas.paraCima = true;
    }else if (evento.key === "ArrowDown") {
        teclasArmazenadas.paraBaixo = true;
    }

    //gerenciando Ataque
    if (evento.key === " " && permissaoAtaque) {
        teclasArmazenadas.espaco = true;
        tempoAtaque = duracaoAtaque;
        xImagem = 0;
    }
});

document.addEventListener("keyup", function (evento) {
    if (evento.key === "ArrowLeft") {
        teclasArmazenadas.paraEsquerda = false;
    }else if (evento.key === "ArrowRight") {
        teclasArmazenadas.paraDireita = false;
    }

    if (evento.key === "ArrowUp") {
        teclasArmazenadas.paraCima = false;
    }else if (evento.key === "ArrowDown") {
        teclasArmazenadas.paraBaixo = false;
    }

    //gerenciando Ataque
    if (evento.key === " ") {
        teclasArmazenadas.espaco = false;
        //permissaoAtaque = true;
    }
});


//funções reservadas para Testes do Personagem
export function testePersonagem () {
    //console.log(tempoAtaque);
}
//gerenciando Importações
import { contexto } from "./jogo.js"
import { personagem } from "./personagem.js";


//fazendo a Criação do inimigo
var listaInimigos = []
var quantidadeInimigos = 3;
var a = 0;

export function criandoInimigos () {
    
    //gerando os Inimigos
    if (listaInimigos.length < quantidadeInimigos) {

        listaInimigos.push({
            x: 10*a,
            y: 80,
            largura: 25,
            altura: 60,
            tempoEspera: Math.floor(Math.random()*40),
            tempoCorrer: null,
            parado: true,
            correndo: false,
            esquerda: null,
            direita: null,
            perto: null,
            longe: null,
            imagens: {
                paradoEsquerda: new Image(),
                paradoDireita: new Image(),
                correndoEsquerda: new Image(),
                correndoDireita: new Image()
            },
            imagemX: 0

        });

        a++;
    }

    //gerando as Imagens
    for (var i=0; i < listaInimigos.length; i++) {
        var b = listaInimigos[i].imagens;

        b.paradoEsquerda.src = "./imagens/inimigo/paradoDireita.png";
        b.paradoDireita.src = "./imagens/inimigo/paradoEsquerda.png";
        b.correndoEsquerda.src = "./imagens/inimigo/correndoDireita.png";
        b.correndoDireita.src = "./imagens/inimigo/correndoEsquerda.png";
    }
}


//fazendo o Posicionamento
export function posicionarInimigos () {
    for (var i = 0; i < listaInimigos.length; i++) {
        var b = listaInimigos[i];


        //gerenciando a Posição para o personagem
        if (b.x < personagem.x) {
            //está para a Esquerda
            b.esquerda = true;
            b.direita = false;
        }else if (personagem.x < b.x) {
            //está paara a Direita
            b.esquerda = false;
            b.direita = true;
        }


        //gerenciando a Distancia para o personagem a Esquerda
        if (b.x + b.largura < personagem.x && b.esquerda) {
            //distancia para a Esquerda
            b.perto = false;
            b.longe = true;
        }else if (!(b.x + b.largura < personagem.x) && b.esquerda) {
            //perto do personagem a Esquerda
            b.perto = true;
            b.longe = false;
        }

        //gerenciando a Distancia para o personagem a Direita
        if (personagem.x + personagem.largura < b.x && b.direita) {
            b.perto = false;
            b.longe = true;
        }else if (!(personagem.x + personagem.largura < b.x) && b.direita) {
            b.perto = true;
            b.longe = false;
        }
    }
}


//fazendo o Desenho do inimigo
export function desenharInimigos () {
    for (var i = 0; i < listaInimigos.length; i++) {
        var b = listaInimigos[i];

        if (b.esquerda && b.correndo && b.longe) {
            
            b.imagemX++;
            
            if (b.imagemX >= 5) {
                b.imagemX = 0;
            }

            contexto.drawImage(b.imagens.correndoEsquerda, b.imagemX*25, 0, b.largura, b.altura, b.x, b.y, b.largura, b.altura);

        }else if (b.direita && b.correndo && b.longe) {
            
            b.imagemX++;
            
            if (b.imagemX >= 5) {
                b.imagemX = 0;
            }

            contexto.drawImage(b.imagens.correndoDireita, b.imagemX*25, 0, b.largura, b.altura, b.x, b.y, b.largura, b.altura);

        }else if (b.esquerda && !b.direta) {
            contexto.drawImage(b.imagens.paradoEsquerda, b.imagemX*25, 0, b.largura, b.altura, b.x, b.y, b.largura, b.altura);
            b.imagemX++;

            if (b.imagemX >= 6) {
                b.imagemX = 0;
            }

        }else if (!b.esquerda && b.direita) {
            contexto.drawImage(b.imagens.paradoDireita, b.imagemX*25, 0, b.largura, b.altura, b.x, b.y, b.largura, b.altura);
            b.imagemX++;

            if (b.imagemX >= 6) {
                b.imagemX = 0;
            }
        }
    }
}


//criando Estrategia do inimigo
export function estrategiaInimigos () {
    for (var i = 0; i < listaInimigos.length; i++) {
        var b = listaInimigos[i];

        if (b.parado && b.tempoEspera > 0) {
            b.tempoEspera--;
        }else if (b.parado && b.tempoEspera <= 0) {
            b.parado = false;
            b.correndo = true;
            b.tempoCorrer = Math.floor(Math.random()*40);
        }else if (b.correndo && b.tempoCorrer > 0) {
            b.tempoCorrer--;
        }else if(b.correndo && b.tempoCorrer <= 0) {
            b.parado = true;
            b.correndo = false;
            b.tempoEspera = Math.floor(Math.random()*60);
        }
    }
}


//fazendo o Movimento do inimigo
export function moverInimigos () {
    for (var i =0; i < listaInimigos.length; i++) {
        var b = listaInimigos[i];

        if (b.esquerda && b.longe && b.tempoCorrer > 0) {
            b.x++;
        }else if (b.direita && b.longe && b.tempoCorrer > 0) {
            b.x--;
        }
    }
}


//funções para Testes  
export function testeInimigo() {
    if (listaInimigos.length > 0) {
        var a = 0;
        var b = listaInimigos[a];

        if (listaInimigos.length > a) {
            console.log(b.imagemX);
        }
    }
}
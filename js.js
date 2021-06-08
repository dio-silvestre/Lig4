const game = document.getElementById("game");

const placar1 = document.getElementsByClassName("placar--pontos")[0];
const placar2 = document.getElementsByClassName("placar--pontos")[1];

let cor = [];   //variavel para alternar de jogador em cada turno
cor[0] = 1;

let jogoAcabou = false; //booleano para parar o jogo quando acabar

let posicao = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];

//FUNÇÃO COMUM:
//function nomeFuncao(parametros){
    //codigo...
//}

//anonima:
//function(parametros){codigos...}


//ARROY FUNCTION
//const nomeFuncao = (parametros) => {
    //codigos...
//}

//anonima:
//(parametros) => {
    //codigos...
//}

//anonima com return implícito:
//(paramentros) => codigos...

const vitoriaLinha = (arr,indexLinha,jogador) => {
    //verificar se ocorreu vitoria no sentido horizontal
    //arr = posicao
    //indexLinha captura a posição da linha da ultima jogada
    //jogador é o número que representa o jogador (1 ou 2)

    let contador = 0; //verifica se tem 4 bolinhas em linha
    for(let i = 0;i < arr[indexLinha].length;i++) { 
        if(arr[indexLinha][i] === jogador){ //<-- só interessa percorrer a linha clicada
            contador++; //se achou bolinha soma contador
            if(contador === 4){ 
                return true; //4 bolinhas = vitória
            }
        } else { 
            contador = 0;
            //se achou um valor diferente do número do jogador ao percorrer a linha tem que reiniciar a contagem, porque só interessa se encontrar quatro seguidos
        }
    }
    return false; // percorreu tudo e não retornou true é porque não tem 4 bolinhas seguidas
}

const vitoriaColuna = (arr,indexColuna,jogador) => {
    //verificar se ocorreu vitoria no sentido vertical
    //arr = posicao
    //indexColuna captura a posição da coluna da ultima jogada
    //jogador é o número que representa o jogador (1 ou 2)
    let contador = 0; //verifica se tem 4 bolinhas em linha
    for(let i = 0;i < 6;i++){ 
        if(arr[i][indexColuna] === jogador){ //<-- só interessa percorrer a coluna clicada
            contador++; //se achou bolinha soma contador
            if(contador === 4){ 
                return true; //4 bolinhas = vitória
            }
        }else{
            contador = 0;
            //se achou um valor diferente do número do jogador ao percorrer a coluna tem que reiniciar a contagem, porque só interessa se encontrar quatro seguidos
        }
    }
    return false; // percorreu tudo e não retornou true é porque não tem 4 bolinhas seguidas
}

const vitoriaDiagonal1 = (arr,indexLinha,indexColuna,jogador) => { //verifica diagonal assim --> /
    let diagonal = [];
    let i = indexLinha;
    let j = indexColuna;
    for(;i >= 0 && j < arr[0].length;){
        diagonal.push(arr[i][j])
        i--;
        j++;
    }
    i = indexLinha + 1;
    j = indexColuna - 1;
    for(;i < arr.length && j >= 0;){
        diagonal.unshift(arr[i][j])
        i++;
        j--;
    }
    let contador = 0; //verifica se tem 4 bolinhas em linha
    for(i = 0;i < diagonal.length;i++){ 
        if(diagonal[i] === jogador){
            contador++; //se achou bolinha soma contador
            if(contador === 4){ 
                return true; //4 bolinhas = vitória
            }
        }else{
            contador = 0;
            //se achou um valor diferente do número do jogador ao percorrer tem que reiniciar a contagem, porque só interessa se encontrar quatro seguidos
        }
    }
    return false;
}

const vitoriaDiagonal2 = (arr,indexLinha,indexColuna,jogador) => { //verifica diagonal assim --> \
    let diagonal = [];
    let i = indexLinha;
    let j = indexColuna;
    for(;i >= 0 && j >= 0;){
        diagonal.push(arr[i][j])
        i--;
        j--;
    }
    i = indexLinha + 1;
    j = indexColuna + 1;
    for(;i < arr.length && j < arr[0].length;){
        diagonal.unshift(arr[i][j])
        i++;
        j++;
    }
    let contador = 0; //verifica se tem 4 bolinhas em linha
    for(i = 0;i < diagonal.length;i++){ 
        if(diagonal[i] === jogador){
            contador++; //se achou bolinha soma contador
            if(contador === 4){ 
                return true; //4 bolinhas = vitória
            }
        }else{
            contador = 0;
            //se achou um valor diferente do número do jogador ao percorrer tem que reiniciar a contagem, porque só interessa se encontrar quatro seguidos
        }
    }
    return false;
}

const deuEmpate = (arr) => {
    //verifica se preencheu tudo
    let newArr = [].concat(...arr)
    return !newArr.includes(0);
}


const criarBolinhas = (t,cor,posicao,indexColuna) => { 
    // t = a torre no DOM
    // cor = jogador desse turno
    // posicao = registro de onde estão as bolinhas em uma matriz
    //indeXColuna = o index da coluna pego usando DOM
    if (t.childElementCount !== 6 && jogoAcabou === false) { //condição para adicionar bolinha
        let bolinhaX = document.createElement("div"); //a bolinha no DOM
        pos = t.childElementCount;  //variavel para ter uma referencia de qual linha foi clicada
        let indexLinha = 5-pos; //variavel com a linha clicada
        if(cor[0] === 1){ //Esse bloco se refere ao jogador 1
            bolinhaX.className = "bolinhaJogador1"; //Classe das bolinhas do jogador 1
            posicao[indexLinha][indexColuna] = 1; //salva posicao da bolinha adicionada
            if(vitoriaLinha(posicao,indexLinha,1) 
                || vitoriaColuna(posicao,indexColuna,1) 
                || vitoriaDiagonal1(posicao,indexLinha,indexColuna,1)
                || vitoriaDiagonal2(posicao,indexLinha,indexColuna,1)) {
                //Se ele venceu...
                placar1.innerText = Number(placar1.innerText)+1;
                let vitoriaAlerta = document.createElement("p"); // Cria tag p para por a mensagem
                vitoriaAlerta.className = 'vitoria-alerta1'; //Classe da tag p para estilizar no CSS
                vitoriaAlerta.innerText = `${jogadores[0]} venceu!!`; //Texto que terá na tag p
                game.appendChild(vitoriaAlerta); //Coloca a tag p na tela
                jogoAcabou = true; //Variável para verificar se o jogo acabou

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                game.appendChild(img)
            }
            cor[0] = 0; //Alterna de jogador para a próxima jogada
        } else { //Esse bloco se refere ao jogador 2
            bolinhaX.className = "bolinhaJogador2"; //Classe das bolinhas do jogador 2
            posicao[indexLinha][indexColuna] = 2; //salva posicao da bolinha adicionada
            if(vitoriaLinha(posicao,indexLinha,2)
                || vitoriaColuna(posicao,indexColuna,2)
                || vitoriaDiagonal1(posicao,indexLinha,indexColuna,2)
                || vitoriaDiagonal2(posicao,indexLinha,indexColuna,2)) {
                //Se ele venceu...
                placar2.innerText = Number(placar2.innerText)+1;
                let vitoriaAlerta = document.createElement("p"); //Cria tag p para por a mensagem
                vitoriaAlerta.className = 'vitoria-alerta2'; //Classe da tag p para estilizar no CSS
                vitoriaAlerta.innerText = `${jogadores[1]} venceu!!`; //Texto que terá na tag p
                game.appendChild(vitoriaAlerta); //Coloca a tag p na tela
                jogoAcabou = true; //Variável para verificar se o jogo acabou

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                game.appendChild(img)
            }
            cor[0] = 1; //Alterna de jogador para a próxima jogada
        }
        t.appendChild(bolinhaX); // Por fim, põe a bolinha criada no jogo
        if (deuEmpate(posicao)) { //Preencheram tudo
            let empateAlerta = document.createElement("p"); //Cria tag p para por a mensagem
            empateAlerta.className = 'empate-alerta'; //Classe da tag p para estilizar no CSS
            empateAlerta.innerText = 'Empate!!'; //Texto que terá na tag p
            game.appendChild(empateAlerta); //Coloca a tag p na tela
            jogoAcabou = true; //Variável para verificar se o jogo acabou

            let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                game.appendChild(img)
        }
    }
}

//Técnica Event Delegation:
game.addEventListener("click",(e) => { 
    //'e' é o parametro event do addEventListener ele recebe e.target de tudo que recebeu o clique dentro da div game
    if (e.target.className === 'torre') { //só o e.target de uma torre passa
        const torre = e.target; //só pra deixar mais explícito que é uma torre
        const indexColuna = Number(torre.id[1]) - 1; //o id das torres tem o índice delas +1 (t1, t2, t3...) OBS: talvez seja melhor usar dataset
        criarBolinhas(torre,cor,posicao,indexColuna); //chama a função para criar a bola nesta torre
    }
});

const iniciar = document.getElementById("iniciar");
const form = document.querySelector(".form");
iniciar.addEventListener("click", () => {
    iniciar.style.display = "none";
    form.style.display = "block";
});

let jogadores = [];
const pronto = document.getElementById("pronto");
const placar = document.getElementById("caixa-placar");
const hidden = document.querySelectorAll(".hidden");
pronto.addEventListener("click", () => {
    game.style.display = "flex";
    form.style.display = "none";
    placar.style.display = "flex";
    pronto.style.display = "none";

    for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "inline-block";
    }

    const jogador1 = document.getElementById("jogador1");
    const jogador2 = document.getElementById("jogador2");
    jogadores.push(jogador1.value);
    jogadores.push(jogador2.value);
});

let btn_reiniciar = document.getElementById("reiniciar");
btn_reiniciar.addEventListener("click", reiniciar=()=>{
    let pai = document.querySelectorAll('.torre');
    for(let i=0; i<pai.length; i++){
        pai[i].innerHTML=""
    }          
    posicao = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
            ];
});

let btn_zerar = document.getElementById("zerar");
    btn_zerar.addEventListener("click", zerar=()=>{
        placar1.innerText = Number('0')
        placar2.innerText = Number('0')
    });

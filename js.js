const game = document.getElementById("game");

const body = document.getElementsByTagName("body")[0];
const placar1 = document.getElementsByClassName("placar--pontos")[0];
const placarFundo1 = placar1.closest('.placar');
const placar2 = document.getElementsByClassName("placar--pontos")[1];
const placarFundo2 = placar2.closest('.placar');
const timerValor = document.querySelector("#valor-timer");
const caixaTimer = document.getElementById("timer");
const aviso = document.getElementById("aviso-nome");

const pronto = document.getElementById("pronto");
const placar = document.getElementById("caixa-placar");
const hidden = document.querySelectorAll(".hidden");
const jogador1 = document.getElementById("jogador1");
const jogador2 = document.getElementById("jogador2");

const boxBot = document.getElementById('box-bot');
let jogadores = [];
let modoContraBot = false;
let ultimaJogadaKenzinho = [];

let cor = [];   //variavel para alternar de jogador em cada turno
cor[0] = 1;

let jogoAcabou = false;

let posicao = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];
let timerAtual;

// Efeitos sonoros
let somClick = new Audio();
somClick.src = './sounds/wet-click.wav';

let somBolinha = new Audio();
somBolinha.src = './sounds/boing-sfx.mp3';

let somVitoria = new Audio();
somVitoria.src = './sounds/badass-victory.wav';

let somEmpate = new Audio();
somEmpate.src = './sounds/game-over.wav';

let somGif = new Audio();
somGif.src = './sounds/xomu-tera.mp3';


//Função de verificação da vitória na horizontal
function escolherTorre(col){

    const t1 = document.getElementById("t1");
    const t2 = document.getElementById("t2");
    const t3 = document.getElementById("t3");
    const t4 = document.getElementById("t4");
    const t5 = document.getElementById("t5");
    const t6 = document.getElementById("t6");
    const t7 = document.getElementById("t7");


    let x = col + 1;
    if(x == 1){
        return t1;
    }else if( x == 2){
        return t2;
    }else if( x == 3){
        return t3;
    }else if( x == 4){
        return t4;
    }else if( x == 5){
        return t5;
    }else if( x == 6){
        return t6;
    }else{
        return t7;
    }
}

function baixo(arr,indexLinha, indeXColuna, topo){
    if(topo == indexLinha){
        baixo = topo +2;
    }else{

    }
}

// FUNÇÕES DE VERIFICAÇÃO DE VITORIA E EMPATE 
const vitoriaLinha = (arr,indexLinha,indexColuna,jogador) => {

    let contador = 0; //verifica se tem 4 bolinhas em linha
    for(let i = 0;i < arr[indexLinha].length;i++) { 
        if(arr[indexLinha][i] === jogador){
            contador++;
            
            if(contador === 4){ 
                
                let pos = i;
                let t;
            
                for(let k = pos; k > pos-4;k--){
                    if(indexColuna != k){
                        t = escolherTorre(k);
                        t.childNodes[5-indexLinha].classList.add("verde");
                    }
                }

                return true;
            }
        } else { 
            contador = 0;
        }
    }
    return false;
}

const vitoriaColuna = (arr,indexColuna,jogador) => {
    let contador = 0;

    for(let i = 0;i < 6;i++){ 
        if(arr[i][indexColuna] === jogador){
            contador++;
            pos = i ;
            if(contador === 4){ 
                let t = escolherTorre(indexColuna);
                let tam = t.childElementCount;
                for(let k = tam-1; k>tam-4;k--){
                    t.childNodes[k].classList.add("verde");
                }

                return true;

            }
        }else{
            contador = 0;
        }
    }
    return false;
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
    let contador = 0;
    for(i = 0;i < diagonal.length;i++){ 
        if(diagonal[i] === jogador){
            contador++;
            if(contador === 4){ 
                console.log("DIAGONAL 1");
                let topo;
                let coluna = -1;
                for(let x = 0; x < diagonal.length; x++){
                    if(diagonal[i] == jogador){
                        topo = 5-i;
                    }
                }

                let topoColuna = indexColuna +(indexLinha-topo);

                if(diagonal.length == 5 && topo == 2 && topoColuna != 0){
                    topo = topo -1;
                }

                if(diagonal.length == 4&& topo == 2 && topoColuna != 6){
                    topo = topo -2;
                }
                
                if(topo == indexLinha){
                    for(let k = 0; k < 4 ; k++){
                        
                        if(indexLinha != topo){

                            coluna = 5-indexLinha;

                            t = escolherTorre(indexColuna);
                            t.childNodes[coluna].classList.add("verde");

                        }
                        indexLinha++;
                        indexColuna--;
                    }
                }else{
                    indexColuna = indexColuna+(indexLinha-topo);
                    for(let k = 0; k < 4 ; k++){
                        
                        if(indexLinha != topo){

                            coluna = 5-topo;

                            t = escolherTorre(indexColuna);
                            t.childNodes[coluna].classList.add("verde");

                        }
                        topo++;
                        indexColuna--;
                    
                    }   
                }
                console.log("\n");   
                return true;
            }
        }else{
            contador = 0;
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
    let contador = 0;
    for(i = 0;i < diagonal.length;i++){ 
        if(diagonal[i] === jogador){
            contador++;
            if(contador === 4){ 
                console.log("DIAGONAL 2");
                let topo;
                let coluna = -1;
                for(let x = 0; x < diagonal.length; x++){
                    if(diagonal[i] == jogador){
                        topo = 5-i;
                    }
                    
                }
            
                let topoColuna = indexColuna-(indexLinha-topo);
                if(diagonal.length == 5 && topo == 2 && topoColuna != 6){
                    topo = topo -1;
                }

                if(diagonal.length == 4 && topo == 2 && topoColuna != 0){
                    topo = topo -2;
                }
                
                if(topo == indexLinha){
                    
                    for(let k = 0; k < 4 ; k++){
                        
                        if(indexLinha != topo){
                            coluna = 5-indexLinha;

                            t = escolherTorre(indexColuna);
                            t.childNodes[coluna].classList.add("verde");

                        }
                        indexLinha++;
                        indexColuna++;
                    }
                }else{
                    
                    indexColuna = indexColuna-(indexLinha-topo);
                    for(let k = 0; k < 4 ; k++){
                        
                        if(indexLinha != topo){

                            coluna = 5-topo;

                            t = escolherTorre(indexColuna);
                            t.childNodes[coluna].classList.add("verde");

                        }
                        topo++;
                        indexColuna++;                  
                    
                    }
                
                }
                console.log("\n");
                return true;
            }
        }else{
            contador = 0;
        }
    }
    return false;
}

const deuEmpate = (arr) => {
    let newArr = [].concat(...arr);
    return !newArr.includes(0);
}

const venceu = (arr,indexLinha,indexColuna,jogador) => vitoriaLinha(arr,indexLinha,indexColuna,jogador) 
                                                    || vitoriaColuna(arr,indexColuna,jogador) 
                                                    || vitoriaDiagonal1(arr,indexLinha,indexColuna,jogador) 
                                                    || vitoriaDiagonal2(arr,indexLinha,indexColuna,jogador);

//TIMER                                                
const timer = () => {
    let tempo = Number(timerValor.innerText)+1;
    timerValor.innerText = tempo;
    if(tempo > 9){
        if(cor[0] == 1){
            placar2.innerText = Number(placar2.innerText)+1;
            let vitoriaAlerta = document.createElement("p"); 
            vitoriaAlerta.className = 'alerta vitoria-alerta2';
            vitoriaAlerta.innerText = `${jogadores[1]} venceu!!`; 
            game.appendChild(vitoriaAlerta); 
            jogoAcabou = true; 
            reiniciaTimer(timerValor,timerAtual);
            
        }else{
            placar1.innerText = Number(placar1.innerText)+1;
            let vitoriaAlerta = document.createElement("p");
            vitoriaAlerta.className = 'alerta vitoria-alerta1'; 
            vitoriaAlerta.innerText = `${jogadores[0]} venceu!!`;
            game.appendChild(vitoriaAlerta); 
            jogoAcabou = true; 
            reiniciaTimer(timerValor,timerAtual);
        }

        let img = document.createElement("img");
        img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
        img.id = 'vitoria';
        game.appendChild(img)
        somVitoria.play();
        window.setTimeout(removerImgVitoria,3500);
    }
}

//EASTEREGG
const easterEgg = (nome,bolinhaX,placarFundo,img,cor) => {
    if(nome.toLowerCase() === img){
        bolinhaX.classList.add(img);
        bolinhaX.style.borderRadius = '0';
        placarFundo.style.backgroundColor = cor;
        placar2.style.color = 'black';
        body.style.backgroundImage = "url(./img/fundo-de-moedas.jpg)";
    }
}

//FUNÇÕES DE SUPORTE
const PegarNumeroAleatorio = (min, max) => Math.random() * (max - min) + min;

const removerImgVitoria = () => {
    let mensagemVitoria = document.getElementsByClassName("alerta");
    let imagemVitoria = document.getElementById("vitoria");
    for (let i = 0; i < mensagemVitoria.length; i++) {
        mensagemVitoria[i].remove();
        imagemVitoria.remove();
    }
}

const reiniciaTimer = (timerParaZerar,timerIniciado) => {
    window.clearInterval(timerIniciado);
    timerParaZerar.innerText = '0';
}


//FUNÇÃO DA JOGADA!!!!
const criarBolinhas = (t,cor,posicao,indexColuna) => { 
    // t = a torre no DOM
    // cor = jogador desse turno
    // posicao = registro de onde estão as bolinhas em uma matriz
    // indeXColuna = o index da coluna pego usando DOM   

    

    if (t.childElementCount !== 6 && jogoAcabou === false) {
        let bolinhaX = document.createElement("div"); 
        pos = t.childElementCount; 
        let indexLinha = 5-pos; 
        timerAtual = setInterval(timer, 1000);
        if(cor[0] === 1){ 
            bolinhaX.classList.add("bolinhaJogador1"); 
            easterEgg(jogador1.value,bolinhaX,placarFundo1,'kenzie','dodgerblue');
            posicao[indexLinha][indexColuna] = 1; 
            somBolinha.play();
            if(venceu(posicao,indexLinha,indexColuna,1)) {
                bolinhaX.classList.add("verde");
                placar1.innerText = Number(placar1.innerText)+1;
                let vitoriaAlerta = document.createElement("p"); 
                vitoriaAlerta.className = 'alerta vitoria-alerta1'; 
                vitoriaAlerta.innerText = `${jogadores[0]} venceu!!`; 
                game.appendChild(vitoriaAlerta); 
                jogoAcabou = true; 
                reiniciaTimer(timerValor,timerAtual);

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                img.id = 'vitoria';
                game.appendChild(img)
                somVitoria.play();
                window.setTimeout(removerImgVitoria,3500);
            }
            cor[0] = 0;
            placarFundo1.style.opacity = '0.6';
            placarFundo1.style.border = '2px dashed white';
            placarFundo1.style.borderRight = 'none';
            placarFundo2.style.opacity = '1';
            placarFundo2.style.border = '2px solid white';
            placarFundo2.style.borderLeft = 'none';
        } else { 
            bolinhaX.classList.add("bolinhaJogador2");
            easterEgg(jogador2.value,bolinhaX,placarFundo2,'pato','yellow');
            posicao[indexLinha][indexColuna] = 2;
            somBolinha.play();
            if(venceu(posicao,indexLinha,indexColuna,2)) {
                bolinhaX.classList.add("verde");
                placar2.innerText = Number(placar2.innerText)+1;
                let vitoriaAlerta = document.createElement("p"); 
                vitoriaAlerta.className = 'alerta vitoria-alerta2'; 
                vitoriaAlerta.innerText = `${jogadores[1]} venceu!!`;
                game.appendChild(vitoriaAlerta);
                jogoAcabou = true;
                reiniciaTimer(timerValor,timerAtual);

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                img.id = 'vitoria';
                game.appendChild(img)
                somVitoria.play();
                window.setTimeout(removerImgVitoria,3500);
            }
            cor[0] = 1;
            placarFundo1.style.opacity = '1';
            placarFundo1.style.border = '2px solid white';
            placarFundo1.style.borderRight = 'none';
            placarFundo2.style.opacity = '0.6';
            placarFundo2.style.border = '2px dashed white';
            placarFundo2.style.borderLeft = 'none';
            //variável para o Kenzinho:
            ultimaJogadaKenzinho = [indexLinha,indexColuna];
            console.log(ultimaJogadaKenzinho);
        }
        t.appendChild(bolinhaX);
        if (deuEmpate(posicao)) { 
            let empateAlerta = document.createElement("p"); 
            empateAlerta.className = 'alerta empate-alerta'; 
            empateAlerta.innerText = 'Empate!!'; 
            game.appendChild(empateAlerta); 
            jogoAcabou = true; 
            window.clearInterval(timerAtual);

            let img = document.createElement("img");
            img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
            img.id = 'vitoria'
            game.appendChild(img)
            somEmpate.play();
            window.setTimeout(removerImgVitoria,3500);
        }
        if(modoContraBot && cor[0] === 0){
            game.removeEventListener("click",cliqueJogador);
            let delay = PegarNumeroAleatorio(1000, 5000);
            window.setTimeout(automatizarJogador2,delay); // KENZINHO AQUI!!
            
        }
    }
}

//MANIPULADOR DE EVENTO DO CLIQUE DO JOGADOR
const cliqueJogador = (e) => {
    reiniciaTimer(timerValor,timerAtual);
    if (e.target.className === 'torre') {
        const torre = e.target; 
        const indexColuna = Number(torre.id[1]) - 1; 
        criarBolinhas(torre,cor,posicao,indexColuna);
    }
}

//OUVINTE DO CLIQUE DO JOGADOR
game.addEventListener("click",cliqueJogador);

//Iniciar jogo indo para a tela de definir nomes para os jogadores
const iniciar = document.getElementById("iniciar");
const regras = document.getElementById("regras");
const form = document.querySelector(".form");
iniciar.addEventListener("click", () => {
    regras.style.display = "none";
    form.style.display = "block";

    somClick.play();
});

//Sai da tela de nomes dos jogadores e inicia o jogo
pronto.addEventListener("click", () => {
    
    if (jogador1.value === "") {
        aviso.innerHTML = "Por favor, preencha o campo Jogador 1";
        jogador1.focus();
    }
    else if (jogador2.value === "") {
        aviso.innerHTML = "Por favor, preencha o campo Jogador 2";
        jogador2.focus();
    } else {
    
        game.style.display = "flex";
        form.style.display = "none";
        placar.style.display = "flex";
        caixaTimer.style.display = "flex";

        for (let i = 0; i < hidden.length; i++) {
            hidden[i].style.display = "inline-block";
        }

        jogadores.push(jogador1.value);
        jogadores.push(jogador2.value);

        modoContraBot = false;

        somClick.play();
    }
});

//Inicia uma nova partida sem zerar o placar
const reiniciar = () => {
    reiniciaTimer(timerValor,timerAtual);
    let pai = document.querySelectorAll('.torre');
    for(let i=0; i<pai.length; i++){
        pai[i].innerHTML = "";
    }
    
    jogoAcabou = false;
    posicao = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
            ];

    removerImgVitoria();

    somClick.play();
};

let btn_reiniciar = document.getElementById("reiniciar");
btn_reiniciar.addEventListener("click", reiniciar);

//Zera somente o placar
let btn_zerar = document.getElementById("zerar");
btn_zerar.addEventListener("click", zerar=()=>{
    placar1.innerText = Number('0');
    placar2.innerText = Number('0');
    reiniciaTimer(timerValor,timerAtual); 

    somClick.play();
});

//Alterar os nomes dos jogadores
let btn_trocarNomes = document.getElementById("trocar-nome");
btn_trocarNomes.addEventListener("click", trocarNomes=()=> {
    
    game.style.display = "none";
    form.style.display = "block";
    placar.style.display = "none";
    caixaTimer.style.display = "none";

    for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "none";
    }

    reiniciar();
});

//Jogar contra o bot Kenzinho
let btn_bot = document.getElementById("kenzinho");
btn_bot.addEventListener("click", vsBot=()=>{
    game.style.display = "flex";
    form.style.display = "none";
    placar.style.display = "flex";
    caixaTimer.style.display = "flex";

    for (let i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "inline-block";
    }

    if (jogador1.value === "") {
        aviso.innerHTML = "Por favor, preencha o campo Jogador 1";
        jogador1.focus();
    }

    jogadores.push(jogador1.value);
    jogador2.value = 'Kenzinho';
    jogadores.push(jogador2.value);

    modoContraBot = true;

    somClick.play();
})

//Jogar contra o bot Davis
let btn_davis = document.getElementById("davis");
btn_davis.addEventListener("click", vsDavis=()=>{
    const alertaPagamento = document.getElementById("aviso-pagamento")
     
    alertaPagamento.className = 'alerta empate-alerta'; 
    alertaPagamento.innerText = 'Assine nosso plano mensal por apenas R$ 99,90';
    let form = document.getElementsByClassName("form")[0];
    form.appendChild(alertaPagamento); 
    window.clearInterval(timerAtual);
});


function changeToOne() {
    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');

    s2.disabled = true;
    s1.disabled = false;
}

function changeToTwo() {
    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');

    s1.disabled = true;
    s2.disabled = false;
}

const activate1 = document.getElementById('activate1');
const activate2 = document.getElementById('activate2');

activate1.addEventListener('click', changeToOne);
activate2.addEventListener('click', changeToTwo);

//Clica no GIF e toca uma música
const musicaGif = document.getElementsByClassName('audio')[0];
musicaGif.addEventListener('click', tocaMusica=()=>{
    return somGif.paused ? somGif.play() : somGif.pause();
});
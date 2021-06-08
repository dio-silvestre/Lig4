const game = document.getElementById("game");

let cor = [];
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

const vitoriaLinha = (arr,indexLinha,jogador) => {
    //verificar se ocorreu vitoria no sentido horizontal

    let contador = 0;
    for(let i = 0;i < arr[indexLinha].length;i++) {
        if(arr[indexLinha][i] === jogador){
            contador++;
            if(contador === 4){
                return true;
            }
        } else {
            contador = 0;
        }
    }
    return false;
}

const vitoriaColuna = (arr,indexColuna,jogador) => {
    //verificar se ocorreu vitoria no sentido vertical
    let contador = 0;
    for(let i = 0;i < 6;i++){
        if(arr[i][indexColuna] === jogador){
            contador++;
            if(contador === 4){
                return true;
            }
        }else{
            contador = 0;
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
    if (t.childElementCount !== 6 && jogoAcabou === false) {
        let bolinhaX = document.createElement("div");
        pos = t.childElementCount ;
        let indexLinha = 5-pos;
        if(cor[0] === 1){
            bolinhaX.className = "bolinhaJogador1";
            posicao[indexLinha][indexColuna] = 1;
            if(vitoriaLinha(posicao,indexLinha,1) || vitoriaColuna(posicao,indexColuna,1)){
                let vitoriaAlerta = document.createElement("p");
                vitoriaAlerta.className = 'vitoria-alerta1';
                vitoriaAlerta.innerText = 'Jogador 1 venceu!!';
                game.appendChild(vitoriaAlerta);
                console.log('Jogador 1 venceu!!');
                jogoAcabou = true;

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                game.appendChild(img)
            }
            cor[0] = 0;
        } else {
            bolinhaX.className = "bolinhaJogador2";
            posicao[indexLinha][indexColuna] = 2;
            if(vitoriaLinha(posicao,indexLinha,2) || vitoriaColuna(posicao,indexColuna,2)){
                let vitoriaAlerta = document.createElement("p");
                vitoriaAlerta.className = 'vitoria-alerta2';
                vitoriaAlerta.innerText = 'Jogador 2 venceu!!';
                game.appendChild(vitoriaAlerta);
                console.log('Jogador 2 venceu!!');
                jogoAcabou = true;

                let img = document.createElement("img");
                img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
                game.appendChild(img)
            }
            cor[0] = 1;
        }
        t.appendChild(bolinhaX);
        if (deuEmpate(posicao)) {
            let empateAlerta = document.createElement("p");
            empateAlerta.className = 'empate-alerta';
            empateAlerta.innerText = 'Empate!!';
            game.appendChild(empateAlerta);
            console.log('Empate!!');
            jogoAcabou = true;

            let img = document.createElement("img");
            img.setAttribute('src', 'https://i.pinimg.com/originals/8c/a1/02/8ca102a811768049d3c329f9d471130a.gif');
            game.appendChild(img)
        }
    }
}

game.addEventListener("click",(e) => {
    if (e.target.className === 'torre') {
        const t = e.target;
        const indexColuna = Number(e.target.id[1]) - 1;
        criarBolinhas(t,cor,posicao,indexColuna);
    }
});

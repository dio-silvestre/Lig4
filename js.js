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

const vitoriaLinha = (arr) => {
    //verificar se ocorreu vitoria no sentido horizontal
    const condicao = new RegExp('1111','g');
    let arrStr = arr.reduce((acc,el) => `${acc} ${el.join('')}`,'');
    return condicao.test(arrStr);
}

const vitoriaColuna = (arr) => {
    //verificar se ocorreu vitoria no sentido vertical
    let newArr = [];
    for(let i = 0;i < 7;i++){
        newArr.push(arr.map((el) => el[i]));
    }
    return vitoriaLinha(newArr);
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
        if (cor[0] === 1) {
            bolinhaX.className = "bolinhaJogador1";
            posicao[5-pos][indexColuna] = 1;
            if (vitoriaLinha(posicao) || vitoriaColuna(posicao)) {
                let vitoriaAlerta = document.createElement("p");
                vitoriaAlerta.className = 'vitoria-alerta';
                vitoriaAlerta.innerText = 'Jogador 1 venceu!!';
                game.appendChild(vitoriaAlerta);
                console.log('Jogador 1 venceu!!');
                jogoAcabou = true;
            }
            cor[0] = 0;
        } else {
            bolinhaX.className = "bolinhaJogador2";
            posicao[5-pos][indexColuna] = 2;
            if(vitoriaLinha(posicao) || vitoriaColuna(posicao)){
                let vitoriaAlerta = document.createElement("p");
                vitoriaAlerta.className = 'vitoria-alerta';
                vitoriaAlerta.innerText = 'Jogador 2 venceu!!';
                game.appendChild(vitoriaAlerta);
                console.log('Jogador 2 venceu!!');
                jogoAcabou = true;
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

const game = document.getElementById("game");

const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");
const t4 = document.getElementById("t4");
const t5 = document.getElementById("t5");
const t6 = document.getElementById("t6");
const t7 = document.getElementById("t7");

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

function deuEmpate(arr){
    //verifica se preencheu tudo
    let newArr = [].concat(...arr)
    return !newArr.includes(0);
}


function criarBolinhas(t,cor,posicao,indexColuna){
    if(t.childElementCount !== 6 && jogoAcabou === false){
        let bolinhaX = document.createElement("div");
        pos = t.childElementCount ;
        if(cor[0] === 1){
            bolinhaX.className = "bolinhaJogador1";
            posicao[5-pos][indexColuna] = 1;
            if(vitoriaLinha(posicao) || vitoriaColuna(posicao)){
                let vitoriaAlerta = document.createElement("p");
                vitoriaAlerta.className = 'vitoria-alerta';
                vitoriaAlerta.innerText = 'Jogador 1 venceu!!';
                game.appendChild(vitoriaAlerta);
                console.log('Jogador 1 venceu!!');
                jogoAcabou = true;
            }
            cor[0] = 0;
        }else{
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
        if(deuEmpate(posicao)){
            let empateAlerta = document.createElement("p");
            empateAlerta.className = 'empate-alerta';
            empateAlerta.innerText = 'Empate!!';
            game.appendChild(empateAlerta);
            console.log('Empate!!');
            jogoAcabou = true;
        }
    }
}

t1.addEventListener("click",function(){criarBolinhas(t1,cor,posicao,0)});
t2.addEventListener("click",function(){criarBolinhas(t2,cor,posicao,1)});
t3.addEventListener("click",function(){criarBolinhas(t3,cor,posicao,2)});
t4.addEventListener("click",function(){criarBolinhas(t4,cor,posicao,3)});
t5.addEventListener("click",function(){criarBolinhas(t5,cor,posicao,4)});
t6.addEventListener("click",function(){criarBolinhas(t6,cor,posicao,5)});
t7.addEventListener("click",function(){criarBolinhas(t7,cor,posicao,6)});

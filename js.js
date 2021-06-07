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

let posicao = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

let pos = 0;


const vitoriaLinha = (arr) => {
    const condicao = new RegExp('1111','g');

    let arrStr = arr.reduce((acc,el) => `${acc} ${el.join('')}`,'');
    // console.log(arrStr);
    return condicao.test(arrStr);
}
vitoriaLinha(posicao);

const vitoriaColuna = (arr) => {
    let newArr = [];
    for(let i = 0;i < 7;i++){
        newArr.push(arr.map((el) => el[i]));
    }
    // console.log(newArr);

    return vitoriaLinha(newArr);
}

function deuEmpate(arr){
    let newArr = [].concat(...arr)
    return !newArr.includes(0);
}


function criarBolinhas(t,cor,posicao,num){
    if(t.childElementCount != 6){
        if(cor[0] == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            pos = t.childElementCount ;
            posicao[5-pos][num] = 1;
            t.appendChild(quadradox);
            cor[0] = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            pos = t.childElementCount;
            posicao[5-pos][num] = 2;
            t.appendChild(quadradox);
            cor[0] = 1;
        }

        vitoriaColuna(posicao);
        vitoriaLinha(posicao);

    }
}

t1.addEventListener("click",function(){criarBolinhas(t1,cor,posicao,0)});
t2.addEventListener("click",function(){criarBolinhas(t2,cor,posicao,1)});
t3.addEventListener("click",function(){criarBolinhas(t3,cor,posicao,2)});
t4.addEventListener("click",function(){criarBolinhas(t4,cor,posicao,3)});
t5.addEventListener("click",function(){criarBolinhas(t5,cor,posicao,4)});
t6.addEventListener("click",function(){criarBolinhas(t6,cor,posicao,5)});
t7.addEventListener("click",function(){criarBolinhas(t7,cor,posicao,6)});

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





/*
t1.addEventListener("click", function(){
    if(t1.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";

            pos = t1.childElementCount ;
            posicao[5-pos][0] = 1;

            t1.appendChild(quadradox);
            cor = 0;

        }else{
            
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";

            pos = t1.childElementCount;
            posicao[5-pos][0] = 2;

            t1.appendChild(quadradox);
            
            cor = 1;
        }
    }
});

t2.addEventListener("click", function(){
    if(t2.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t2.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t2.appendChild(quadradox);
            cor = 1;
        }
    }
});

t3.addEventListener("click", function(){
    if(t3.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t3.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t3.appendChild(quadradox);
            cor = 1;
        }
    }
});

t4.addEventListener("click", function(){
    if(t4.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t4.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t4.appendChild(quadradox);
            cor = 1;
        }
    }
});

t5.addEventListener("click", function(){
    if(t5.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t5.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t5.appendChild(quadradox);
            cor = 1;
        }
    }
});

t6.addEventListener("click", function(){
    if(t6.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t6.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t6.appendChild(quadradox);
            cor = 1;
        }
    }
});

t7.addEventListener("click", function(){
    if(t7.childElementCount != 6){
        if(cor == 1){
            let quadradox = document.createElement("div");
            quadradox.className = "quadrado";
            t7.appendChild(quadradox);
            cor = 0;
        }else{
            let quadradox = document.createElement("div");
            quadradox.className = "triangulo";
            t7.appendChild(quadradox);
            cor = 1;
        }
    }
});


const vitoriaLinha = (arr) => {
    const condicao = new RegExp('1111','g');

    let arrStr = arr.reduce((acc,el) => `${acc} ${el.join('')}`,'');
    // console.log(arrStr);
    return condicao.test(arrStr);
}
vitoriaLinha(posicao);
// console.log(vitoriaLinha(posicao));


const vitoriaColuna = (arr) => {
    let newArr = [];
    for(let i = 0;i < 7;i++){
        newArr.push(arr.map((el) => el[i]));
    }
    // console.log(newArr);

    return vitoriaLinha(newArr);
}
// vitoriaColuna(arr);
// console.log(vitoriaColuna(arr));


function deuEmpate(arr){
<<<<<<< HEAD
    return ![...arr].includes(0);
}

*/
=======
    let newArr = [].concat(...arr)
    return !newArr.includes(0);
}

// const arrTeste = [[1,1,1,0,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1],[1,1,1,1,1,1,1]];

console.log(deuEmpate(arrTeste));
>>>>>>> 52b420e8a75f9602426a33a95b6afd2f59c00e0d

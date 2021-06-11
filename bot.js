const automatizarJogador2 = () => {
    reiniciaTimer(timerValor,timerAtual);
    let e = {};
    do{
        let numeroTorre = torreAleatoria();
        e.target = document.getElementById(`t${numeroTorre+1}`);
    }while(e.target.childElementCount === 6)
    cliqueJogador(e);
    game.addEventListener("click",cliqueJogador);
}

const torreAleatoria = () => Math.floor(Math.random()*7);

// const DecidirClique = (e) => {
//     for(let i = 0;i < 7;i++){
//         const torreN = document.getElementById(`t${i+1}`);
//         let linha = torreN.childElementCount;
//         let coluna = i;
//         posicao[linha][coluna] = 2;
//         let bolinhaTeste = document.createElement("div"); 
//         bolinhaTeste.classList.add("teste");
//         torreN.appendChild(bolinhaTeste);
//         if(venceu(posicao,linha,coluna,2)){
//             posicao[linha][coluna] = 0;
//             torreN.removeChild(bolinhaTeste);
//             cliqueJogador(e);
//             break;
//         } else {
//             posicao[linha][coluna] = 0;
//             torreN.removeChild(bolinhaTeste);
//             if(i === 6){
                
//             }
//         }
//     }
// }
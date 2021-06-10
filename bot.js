
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

// const colunaVitoriosa = (matriz,ultimaJogadaKenzinho) => {
//     for(let i = ultimaJogadaKenzinho[0];i >= 0;i--){

//     }
// }
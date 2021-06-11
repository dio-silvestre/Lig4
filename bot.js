
const automatizarJogador2 = () => {
    reiniciaTimer(timerValor,timerAtual);
    let e = {};
    do{
        e.target = melhorColuna(posicao,ultimaJogadaKenzinho)
    }while(e.target.childElementCount === 6)
    cliqueJogador(e);
    game.addEventListener("click",cliqueJogador);
}

const torreAleatoria = () => Math.floor(Math.random()*7);

const melhorColuna= (matriz,ultimaJogadaKenzinho) => {
    const j = ultimaJogadaKenzinho[1];
    let contador = 0;
    for(let i = ultimaJogadaKenzinho[0];i < 6;i++){
        if(i === 0){
            break;
        }
        if(matriz[i][j] === 2){
            contador++;
        }
    }
    if(contador === 3){
        return document.getElementById(`t${j+1}`);
    } else {
        let numeroTorre = torreAleatoria();
        return document.getElementById(`t${numeroTorre+1}`);
    }
}
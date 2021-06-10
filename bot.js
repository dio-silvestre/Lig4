const automatizarJogador2 = () => {
    reiniciaTimer(timerValor,timerAtual);
    let e = {};
    do{
        let numeroTorre = torreAleatoria(); //ALTERAR AQUI
        e.target = document.getElementById(`t${numeroTorre+1}`);
    }while(e.target.childElementCount === 6)
    cliqueJogador(e)

    game.addEventListener("click",cliqueJogador);
}

const torreAleatoria = () => Math.floor(Math.random()*7);
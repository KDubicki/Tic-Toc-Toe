const playButton = document.querySelector('.btn-play')
const state = document.querySelector('.state');
const board = new Board();
const players = {
    'o': new Player('o', '#9250E2'),
    'x': new Player('x', '#33B8FF')
}

const start = () => {
    playButton.style.cssText = `
        opacity: 0;
        visibility: hidden;
    ` ;

    players['o'].reset();
    players['x'].reset();
    board.reset();

    playerTurn(players[board.play]);
    board.prepareCells();
}

const playerTurn = (player) => {
    state.textContent = `Player ${player.id} turn`;
    state.style.cssText = `
        opacity: 1;
        color: ${ player.color };
        text-shadow: 0 0 0.6rem ${ player.color };
    `

    player.play();
}











playButton.addEventListener('click', start);

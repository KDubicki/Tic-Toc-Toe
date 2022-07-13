const playButton = document.querySelector('.btn-play')
const state = document.querySelector('.state');

const board = new Board();
const boardCells = document.querySelectorAll('.board_cell');

const players = {
    'play': null,
    'o': new Player('o', '#9250E2'),
    'x': new Player('x', '#33B8FF')
}

const start = () => {
    playButton.style.cssText = `
        opacity: 0;
        visibility: hidden;
    ` ;

    players.play = (!Math.round(Math.random() * 2) ? 'x' : 'o');
    players['o'].reset();
    players['x'].reset();
    board.reset();

    playerTurn();
}

const playerTurn = (player = players[players.play]) => {
    state.textContent = `Player ${ player.id.toUpperCase() } turn`;
    state.style.cssText = `
        opacity: 1;
        color: ${ player.color };
        text-shadow: 0 0 0.6rem ${ player.color };
    `

    player.play();
}

const playerMarkCell = (e) => {
    if (!board.isOkToMark(e.target)) return;
    board.markCell(e.target, players.play);
    if (board.checkWinner()) showWinner()
    else {
        players[players.play].stop();
        players.play = (players.play === 'x' ? 'o' : 'x');
        playerTurn();
    }
}

const showWinner = () => {
    state.textContent = `Player ${ players.play.toUpperCase() } win`;
    board.showWinner();
    players[players.play].win();
    playButton.style.cssText = `
        opacity: 1;
        visibility: visible;
    ` ;
}









playButton.addEventListener('click', start);
boardCells.forEach(cell => cell.addEventListener('click', playerMarkCell));

class Board {
    cells = new Array(9);
    grades = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    isPlaying = false;
    winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    winningCombination = null;

    reset(cells) {
        this.isPlaying = true;
        this.winningCombination = null;
        this.cells.fill('');
        this.grades.fill(-1);

        cells.forEach(cell => {
            const svg = cell.querySelectorAll('svg');
            Svg.hide(svg[0]);
            Svg.hide(svg[1]);
        })
    }

    isOkToMark(target) {
        const cell = this.getCellHandle(target);
        const grade = document.querySelector('.active-grade').dataset.grade;
        return (grade > this.grades[cell.dataset.cell]);
    }


    markCell(target, player) {
        if (!this.isPlaying) return;

        const cell = this.getCellHandle(target);
        const index = cell.dataset.cell;
        const grade = document.querySelector('.active-grade').dataset.grade;

        this.cells[index] = player;
        this.grades[index] = grade;

        let svg = cell.querySelectorAll('svg');
        svg = (player === 'x' ? [svg[1], svg[0]] : [svg[0], svg[1]]);
        Svg.resizeAndShow(svg[0], grade);
        Svg.hide(svg[1]);
    }

    getCellHandle(target) {
        while(!target.classList.contains('board_cell')) target = target.parentNode;
        return target;
    }

    checkDraw({assets}) {
        const assetsSum = assets.slice(Math.min(...this.grades) + 1).reduce((accum, asset) => accum + asset, 0);
        return assetsSum === 0;
    }

    checkWinner() {
        let winner = false;
        this.winningCombinations.forEach(index => {
            if (this.cells[index[0]] !== '') {
                if (this.cells[index[0]] === this.cells[index[1]] && this.cells[index[0]] === this.cells[index[2]]) {
                    this.winningCombination = index;
                    winner = true;
                }
            }
        })

        return winner;
    }


    showWinner() {
        const cells = document.querySelectorAll('.board_cell');
        cells.forEach((cell, index) => {
            if (!this.winningCombination.includes(index)) {
                const svg = cell.querySelectorAll('svg');
                svg.forEach((item) => item.style.opacity = '0');
            }
        })
    }
}
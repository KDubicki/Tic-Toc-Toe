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

    reset() {
        this.isPlaying = true;
        this.winningCombination = null;
        this.cells.fill('');
        this.grades.fill(-1);
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
        svg[0].style.cssText = `
            width: ${ grade * 2 + 2 }rem;
            height: ${ grade * 2 + 2 }rem;
            z-index: 2;
            opacity: 1;
        `
        svg[1].style.opacity = '0';
    }

    getCellHandle(target) {
        while(!target.classList.contains('board_cell')) target = target.parentNode;
        return target;
    }

    checkWinner() {
        let isWinner = false;
        this.winningCombinations.forEach(index => {
            if (this.cells[index[0]] !== '') {
                if (this.cells[index[0]] === this.cells[index[1]] && this.cells[index[0]] === this.cells[index[2]]) {
                    this.winningCombination = index;
                    isWinner = true;
                }
            }
        })

        console.log(isWinner)
        return isWinner;
    }

    showWinner() {
        const cells = document.querySelectorAll('.board_cell');
        cells.forEach((cell, index) => {
            if (!this.winningCombination.includes(index)) {
                const svgs = cell.querySelectorAll('svg');
                svgs.forEach((svg) => svg.style.opacity = '0');
            }
        })
    }
}


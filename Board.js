class Board {
    cells = new Array(9);
    grades = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
    isToClick = false;

    constructor() {
        this.cellsHendle = document.querySelectorAll('.board_cell');
        this.play = (!Math.round(Math.random() * 2) ? 'x' : 'o');
    }

    reset() {
        this.play = (!Math.round(Math.random() * 2) ? 'x' : 'o');
        this.cells.fill('');
        this.grades.fill(-1);
    }

    prepareCells() {
        this.cellsHendle.forEach(cell => {
            cell.style.cursor = 'pointer';
            cell.addEventListener('mouseenter', e =>this.showCell(e));
            cell.addEventListener('mouseleave', e => this.hideCell(e));
            cell.addEventListener('click', e => this.playerChoose(e));
        })
    }

    showCell(e) {
        const grade = document.querySelector('.active-grade').dataset.grade;
        if (grade > this.grades[e.target.dataset.cell]) {
            this.isToClick = true;

            const elem = e.target.querySelectorAll('svg');
            const index = grade * 2 + (this.play === 'x' ? 1 : 0);
            elem[index].style.cssText = `
                z-index: 2;
                opacity: 1;
            `

            e.target.style.backgroundColor = 'white';
        }
    }
    hideCell(e) {
        console.log(e.target)
        if (!this.isToClick) return;
        const grade = document.querySelector('.active-grade').dataset.grade;
        const elem = e.target.querySelectorAll('svg');
        const index = grade * 2 + (this.play === 'x' ? 1 : 0);
        elem[index].style.cssText = `
            z-index: 0;
            opacity: 0;
        `

        e.target.style.backgroundColor = '#121212'
    }

    playerChoose(e) {
        const grade = document.querySelector('.active-grade').dataset.grade;
        if (grade > this.grades[e.target.dataset.cell]) {
            const index = grade * 2 + (this.play === 'x' ? 1 : 0);
            this.cells[index] = this.play;
            this.grades[index] = grade;

            const elem = e.target.querySelectorAll('svg');
            elem[index].style.cssText = `
                z-index: 2;
                opacity: 1;
            `
        }

        this.isToClick = false;
        this.checkWinner();
    }

    checkWinner() {

    }
}

class Board {
    cells = new Array(9);
    grades = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    reset() {
        this.cells.fill('');
        this.grades.fill(-1);
    }

    // prepareCells() {
    //     this.cellsHendle.forEach(cell => {
    //         cell.style.cursor = 'pointer';
    //         // cell.addEventListener('mouseenter', e =>this.showCell(e));
    //         // cell.addEventListener('mouseleave', e => this.hideCell(e));
    //         cell.addEventListener('click', e => this.markCell(e));
    //     })
    // }

    // showCell(e) {
    //     const grade = document.querySelector('.active-grade').dataset.grade;
    //     if (grade > this.grades[e.target.dataset.cell]) {
    //         this.isToClick = true;
    //
    //         const elem = e.target.querySelectorAll('svg');
    //         const index = grade * 2 + (this.play === 'x' ? 1 : 0);
    //         elem[index].style.cssText = `
    //             z-index: 2;
    //             opacity: 1;
    //         `
    //
    //         e.target.style.backgroundColor = 'white';
    //     }
    // }
    // hideCell(e) {
    //     const grade = document.querySelector('.active-grade').dataset.grade;
    //     const index = grade * 2 + (this.play === 'x' ? 1 : 0);
    //     if (this.grades >= grade) return;
    //
    //     const elem = e.target.querySelectorAll('svg');
    //     elem[index].style.cssText = `
    //         z-index: 0;
    //         opacity: 0;
    //     `
    //
    //     e.target.style.backgroundColor = '#121212'
    //
    // }

    isOkToMark(target) {
        const cell = this.getCellHandle(target);
        const grade = document.querySelector('.active-grade').dataset.grade;
        return (grade > this.grades[cell.dataset.cell]);
    }


    markCell(target, player) {
        const cell = this.getCellHandle(target);
        const index = cell.dataset.cell;
        const grade = document.querySelector('.active-grade').dataset.grade;

        this.cells[index] = player;
        this.grades[index] = grade;


        const svg = cell.querySelectorAll('svg');
        // svg[index].style.cssText = `
        //     z-index: 2;
        //     opacity: 1;
        // `
    }
    //
    // checkWinner() {
    //
    // }
    //
    getCellHandle(target) {
        while(!target.classList.contains('board_cell')) target = target.parentNode;
        return target;
    }
}


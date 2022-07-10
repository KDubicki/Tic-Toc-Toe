class Player {
    assets = [2, 2, 2];
    grade = 0;

    constructor(id, color) {
        this.id = id.toUpperCase();
        this.color = color;
        this.options = document.querySelectorAll(`.player__${ id } div`);
    }

    reset() {
        this.assets.fill(2);
        this.grade = 0;
    }

    play() {
        this.options.forEach(option => {
            option.style.cursor = 'pointer';
            const svg = option.querySelector('svg');
            svg.addEventListener('click', e => this.chooseGrade(e.target));
        });

        this.setOptions();
    }

    setOptions() {
        this.options.forEach(item => {
            if (item.classList.contains('active-grade')) item.classList.remove('active-grade');
            let isActive = false;

            const svg = item.querySelector('svg');
            if (item.dataset.grade === this.grade.toString()) {
                isActive = true;
                item.classList.add('active-grade');
            }

            isActive ? Svg.setColor(svg, this.color) : Svg.off(svg);
        })
    }

    chooseGrade(elem) {
        this.options.forEach((item, index) => {
            const element = item.querySelector('svg');
            if (elem === element) {
                this.grade = item.dataset.grade;
            }
        })

        this.setOptions();
    }


}

class Player {
    assets = [2, 2, 2];
    grade = 0;
    isPlaying = false;

    constructor(id, color) {
        this.id = id.toUpperCase();
        this.color = color;
        this.options = document.querySelectorAll(`.player__${ id } div`);
    }

    reset() {
        this.grade = 0;
        this.assets.fill(2);
        this.refreshAssets();

        this.options.forEach(option => Svg.off(option.querySelector('svg')))
    }

    play() {
        while (this.assets[this.grade] === 0) {
            this.grade++;
            if (this.grade === 3) this.grade = 0;
        }

        this.isPlaying = true;
        this.options.forEach((option, index) => {
            if (this.assets[index] === 0) return;

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

    setDownAsset() {
        const option = document.querySelector('.active-grade');
        this.assets[option.dataset.grade]--;
        this.refreshAssets();
    }

    refreshAssets() {
        this.options.forEach((option, index) => {
            const counter = option.querySelector('.counter');
            counter.innerText = `x${ this.assets[index] }`;
        })
    }

    chooseGrade(target) {
        if (!this.isPlaying) return;

        target = this.getCellHandle(target);
        const grade = target.dataset.grade;
        if (this.assets[grade] === 0) return;

        this.grade = grade;
        this.setOptions();
    }

    getCellHandle(target) {
        while(!target.classList.contains('player__cell')) target = target.parentNode;
        return target;
    }

    stop() {
        this.isPlaying = false;

        this.options.forEach(option => {
            option.style.cursor = 'default';
            Svg.off(option.querySelector('svg'));
        })

        document.querySelector('.active-grade').classList.remove('active-grade');
    }

    win() {
        this.options.forEach(option => Svg.setColor(option.querySelector('svg'), this.color))
    }
}

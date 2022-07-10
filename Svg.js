class Svg {
    static setColor(svg, color) {
        svg.style.cssText = `
            fill: ${ color };
            filter: drop-shadow(0 0 0.3rem ${ color });
            z-index: 2;
        `
    }

    static off(svg) {
        svg.style.cssText = `
            fill: '#646369';
            filter: drop-shadow(0 0 0.3rem '#646369');
            z-index: 1;
        `
    }
}


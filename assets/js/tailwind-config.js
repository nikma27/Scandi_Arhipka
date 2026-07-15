window.tailwind = window.tailwind || {};
window.tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Montserrat', 'sans-serif'],
                handwriting: ['Caveat', 'cursive'],
            },
            colors: {
                paper: '#eaddc6',
                'paper-dark': '#d5c5ad',
                ink: '#332f29',
                'ink-light': '#4a453d',
                accent: '#474238',
            }
        }
    }
};

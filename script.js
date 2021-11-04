import './style.scss';
import SimplexNoise from 'simplex-noise';

'use strict';

// Initial vars
const width = Math.min(window.innerWidth, 400);
const height = Math.min(window.innerHeight, 200);

const cell = 10;
const simplex = new SimplexNoise();
// const loop = 0

/*--------------------
Raf
--------------------*/
class Raf {
    constructor() {
    // Start the animation
        this.raf();
    }

    raf() {
        if (this.onRaf) {
            // Starts an animation loop
            window.requestAnimationFrame(() => {
                const o = {};
                // Time in seconds
                o.time = window.performance.now() / 1000;
                this.onRaf(o);
                this.raf();
            });
        }
    }
}

/*--------------------
Canvas
--------------------*/
class Canvas extends Raf {
    constructor(obj) {
        super();

        // Get the element and attach the 2d context
        this.canvas = document.getElementById(obj.id);
        this.ctx = this.canvas.getContext('2d');

        // Init the dimensions of the canvas
        this.resize();
        this.events();
    }

    resize() {
        this.dpr = window.devicePixelRatio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.canvas.width = width * this.dpr;
        this.canvas.height = height * this.dpr;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);
    }

    events() {
        window.addEventListener('resize', this.resize);
    }

    clear() {
    // Clear the surface of the canvas
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    onRaf() {
    // Clear the canvas every frame
        this.clear();
    }
}

/*--------------------
UTILS FUNCTION
--------------------*/
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1) r = `0${r}`;
    if (g.length == 1) g = `0${g}`;
    if (b.length == 1) b = `0${b}`;

    return `#${r}${g}${b}`;
}

function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

function hslToRgb(h, s, l) {
    let r; let g; let
        b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

/*--------------------
INIT
--------------------*/
const canvas = new Canvas({
    id: 'canvas',
});


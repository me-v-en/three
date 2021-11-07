import Raf from "./raf";
/*--------------------
Canvas
--------------------*/
const width = Math.min(window.innerWidth, 400);
const height = Math.min(window.innerHeight, 200);

export default class Canvas extends Raf {
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
/*--------------------
Raf
--------------------*/
export default class Raf {
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

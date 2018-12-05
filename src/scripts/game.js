import { random } from './utilities';
import Square from './square';

export default class Grid {

    readonly URL = 'https://words-project-breakpoint.firebaseio.com/words.json';

    private grid: HTMLElement;
    private words: string[] = [];
    private squares: Square[] = [];

    readonly ABC_FREQ = {
        // tslint disabled here, as I want it sorted by frequency
        // tslint:disable-next-line:object-literal-sort-keys
        e: 11.1607, a: 8.4966, r: 7.5809, i: 7.5448,
        o: 7.1635, t: 6.9509, n: 6.6544, s: 5.7351,
        l: 5.4893, c: 4.5388, u: 3.6308, d: 3.3844,
        p: 3.1671, m: 3.0129, h: 3.0034, g: 2.4705,
        b: 2.0720, f: 1.8121, y: 1.7779, w: 1.2899,
        k: 1.1016, v: 1.0074, x: 0.2902, z: 0.2722,
        j: 0.1965, q: 0.1962
    };

    constructor(selector: string) {
        this.grid = document.querySelector(selector);
        let ABC = this._createFreqArray();
        let count = 0;
        do {
            let square = new Square(ABC[random(ABC.length)], count, this);
            this.grid.appendChild(square.getDiv());
            this.squares.push(square);
            count += 1;
        } while(count < 16);
    }

    private _createFreqArray(): string[] {
        // find the constant that sets q, the smallest value, to 1
        const k = 1 / this.ABC_FREQ.q;
        let letters: string[] = [];

        // now multiply each letter in the array by timesing its frequency % by k.
        Object.entries(this.ABC_FREQ).forEach(([letter, freq]) => {
            letters = letters.concat(letter.repeat(freq * k).split(''));
        });
        return letters;
    }

    public async play() {
        this.words = await (await fetch(this.URL)).json();
    }
}

const game = new Grid('#game');
game.play();

console.log('test');
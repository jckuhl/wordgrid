import { random } from './utilities.js';
import { http } from './httpUtils.js';
import { ABC_FREQ } from './words.js';
import Square from './square.js';

export default class Grid {

    constructor(selector) {
        this.grid = document.querySelector(selector);
        this.squares = [];
        let ABC = this._createFreqArray();
        let count = 0;
        do {
            let square = new Square(ABC[random(ABC.length)], count, this);
            this.grid.appendChild(square.getDiv());
            this.squares.push(square);
            count += 1;
        } while(count < 16);
    }

    _createFreqArray() {
        // find the constant that sets q, the smallest value, to 1
        const k = 1 / ABC_FREQ.q;
        let letters = [];

        // now multiply each letter in the array by timesing its frequency % by k.
        Object.entries(ABC_FREQ).forEach(([letter, freq]) => {
            letters = letters.concat(letter.repeat(freq * k).split(''));
        });
        return letters;
    }

    async play() {
        this.words = await http.getWords();
    }
}

const game = new Grid('#game');
game.play();
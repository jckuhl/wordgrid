import { random } from './utilities.js';
import { http } from './httpUtils.js';
import { ABC_FREQ } from './words.js';
import Square from './square.js';
import Answer from './answer.js';

export default class Grid {

    constructor(selector) {
        this.grid = document.querySelector(selector);
        this.squares = [];
        this.answer = new Answer('#answer', this);
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

    /**
     *
     *
     * @param {*} square
     * @memberof Grid
     */
    select(square) {
        const selectSquare = ()=> { 
            square.setClass('selected');
            this.answer.addLetter({
                letter: square.getLetter(),
                score: square.getValue(),
            });
        }

        const getNeighbor = (square) => {
            return [
                square.key + 1,
                square.key - 1,
                square.key - 4 - 1,
                square.key - 4,
                square.key - 4 + 1,
                square.key + 4 - 1,
                square.key + 4,
                square.key + 4 + 1
            ]
        }

        if(square.selected) {
            square.removeClass('selected');
        } else {
            const selectedSquares = this.squares.filter(square => square.selected === true);
            if(selectedSquares.length === 0) {
                selectSquare();
            } else {
                let available = selectedSquares.reduce((squares, square)=> {
                    return squares.concat(getNeighbor(square));
                }, []);
                available = Array.from(new Set(available));
                if(available.includes(square.key)) {
                    selectSquare();
                }
            }
        }
    }

    clear() {
        this.squares.forEach(square=> {
            square.selected = false;
            square.removeClass('selected');
        });
    }

    async play() {
        this.words = await http.getWords();
        this.answer.populateWordBank(this.words);
    }
}

const game = new Grid('#game');
game.play();
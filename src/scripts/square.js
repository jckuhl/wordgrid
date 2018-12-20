import { LETTER_SCORES } from './words.js';

export default class Square {

    constructor(letter, key, parent) {
        this.parent = parent;
        this.key = key;
        this.div = document.createElement('div');
        this.div.className = 'game-square';
        this.letter = letter;
        this.div.innerHTML = letter;
        this.selected = false;
        this.value = this._calcValue();

        this.div.addEventListener('mousedown', ()=> {
            this.parent.select(this);
        });
    }

    _calcValue() {
        for(let key in LETTER_SCORES) {
            if(LETTER_SCORES.hasOwnProperty(key) && LETTER_SCORES[key].includes(this.letter.toUpperCase())) {
                let value = parseInt(key);
                if(this.bonus && this.bonus !== '') {
                    // this.bonus looks like: 2l where it means twice the points per that letter
                    // therefore the number is always the first
                    // TODO: implement scores that affect entire word
                    value *= parseInt(this.bonus.split('')[0]);
                }
                return value;
            }
        }
    }

    getDiv() {
        return this.div;
    }

    getLetter() {
        return this.letter;
    }

    getValue() {
        return this.value;
    }

    setClass(className) {
        this.div.classList.add(className);
        this.selected = true;
    }

    removeClass(className) {
        this.div.classList.remove(className);
        this.selected = false;
    }
}
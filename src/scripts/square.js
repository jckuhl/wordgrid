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
    }

    setBonus(bonus) {
        
        const colors = {
            '2l': 'pink',
            '3l': 'purple',
            '2w': 'green',
            '3w': 'yellow'
        }

        if(Object.keys(colors).includes(bonus)){
            this.bonus = bonus
            this.bonusDiv = document.createElement('div');
            this.bonusDiv.innerHTML = this.bonus;
            this.bonusDiv.classList.add('bonus');
            this.bonusDiv.style.backgroundColor = colors[this.bonus];
            this.div.appendChild(this.bonusDiv);
        } else {
            this.bonus = null;
        }
        this.value = this._calcValue();
    }

    _calcValue() {
        for(let key in LETTER_SCORES) {
            if(LETTER_SCORES.hasOwnProperty(key) && LETTER_SCORES[key].includes(this.letter.toUpperCase())) {
                let value = parseInt(key);
                if(this.bonus) {
                    // this.bonus looks like: 2l where it means twice the points per that letter
                    // therefore the number is always the first
                    // 2w and 3w are implemented by Grid class because it involves entire word, not just square
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
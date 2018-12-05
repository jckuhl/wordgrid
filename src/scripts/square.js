export default class Square {

    LETTER_SCORES = {
        '1': ['E', 'A', 'I', 'O', 'N', 'R', 'T', 'L', 'S', 'U'],
        '2': ['D', 'G'],
        '3': ['B', 'C', 'M', 'P'],
        '4': ['F', 'H', 'V', 'W', 'Y'],
        '5': ['K'],
        '8': ['J', 'X'],
        '10': ['Q', 'Z']
    }

    constructor(letter, key, parent) {
        this.parent = parent;
        this.key = key;
        this.div = document.createElement('div');
        this.div.className = 'game-square';
        this.letter = letter;
        this.div.innerHTML = letter;
        this.selected = false;
        this.value = this._calcValue();

        this.div.addEventListener('click', ()=> {
            if(this.selected) {
                this.div.classList.remove('selected');
            } else {
                this.div.classList.add('selected');
            }
            this.selected = !this.selected;
        });
    }

    _calcValue() {
        for(let key in this.LETTER_SCORES) {
            if(this.LETTER_SCORES.hasOwnProperty(key) && this.LETTER_SCORES[key].includes(this.letter.toUpperCase())) {
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
}
//! DEPRECATED
export default class Answer {
    constructor(selector, parent) {
        this.div = document.querySelector(selector);
        this.answerSpan = this.div.firstElementChild;
        this.status = document.querySelector('#status');
        this.parent = parent;
        this.word = '';
        this.wordBank = [];
        this.answer = [];
        this.score = 0;
        this.submitBtn = document.querySelector('#submit');
        this.submitBtn.addEventListener('click', (event)=> {
            if(this.wordBank.length === 0) {
                throw new Error('Not loaded!');
            }
            if(this.wordBank.includes(this.word)) {
                this.status.innerHTML = `${this.word} scores ${this.score}`;
            } else {
                this.status.innerHTML = `${this.word} isn't valid!`;
            }
            this.parent.clear();
            this.answer = [];
            this.answerSpan.innerText = '';
            this.word = '';
        });
    }

    addLetter(letter) {
        this.answer.push(letter);
        this.word = this.answer.reduce((word, letter)=> word += letter.letter, '');
        this.answerSpan.innerText = this.word;
        this.score += letter.score;
    }

    getWord() {
        return this.word;
    }

    populateWordBank(words) {
        this.wordBank = this.wordBank.concat(words);
    }
}
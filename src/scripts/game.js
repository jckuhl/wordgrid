import { random } from './utilities.js';
import { http } from './httpUtils.js';
import { createFreqArray } from './words.js';
import Square from './square.js';

export default class Grid {

    constructor(selector) {
        this.grid = document.querySelector(selector);
        this.squares = [];
        this.selectedLetters = [];
        this.selectedWord = '';
        this.currentScore = 0;
        this.totalScore = 0;
        this.usedWords = new Set();
        let ABC = createFreqArray();
        let count = 0;
        do {
            let square = new Square(ABC[random(ABC.length)], count, this);
            this.grid.appendChild(square.getDiv());
            this.squares.push(square);
            count += 1;
        } while(count < 16);
        document.getElementById('submit').addEventListener('click', this.submitWord.bind(this));
    }

    /**
     *
     *
     * @param {*} square
     * @memberof Grid
     */
    select(square) {

        const generateWordAndScore = ()=> {
            this.selectedWord = this.selectedLetters.map(square => square.letter).join('');
            this.currentScore = this.selectedLetters.reduce((accum, square) => {
                return accum += square.value;
            }, 0);

            const answer = document.getElementById('answer');
            answer.firstElementChild.innerHTML = `${this.selectedWord}, worth: ${this.currentScore}`;
        }

        const selectSquare = ()=> { 
            square.setClass('selected');
            this.selectedLetters.push(square);
            generateWordAndScore();
        }

        const deselectSquare = (square)=> {
            square.removeClass('selected');
            this.selectedLetters = this.selectedLetters.filter(sq => sq.key !== square.key);
            generateWordAndScore();
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
            deselectSquare(square);
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

    submitWord() {
        if(this.words.includes(this.selectedWord) && this.selectedWord.length >= 2) {
            if(!this.usedWords.has(this.selectedWord)) {
                this.appendToUsedList(this.selectedWord, this.currentScore);
                this.usedWords.add(this.selectedWord);
                this.totalScore += this.currentScore;
                document.querySelector('.totals').innerHTML = this.totalScore;
            } else {
                console.log(`${this.selectedWord} is already used!`);
            }
        } else {
            console.log(`${this.selectedWord} is invalid!`);
        }
        this.currentScore = 0;
        this.selectedWord = '';
        this.selectedLetters = [];
        this.clear();
    }

    appendToUsedList(word, score) {
        const list = document.getElementById('usedWords');
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = word;
        const scoreDiv = document.createElement('div');
        scoreDiv.innerHTML = score;
        list.appendChild(wordDiv);
        list.appendChild(scoreDiv);
    }

    async loop() {
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                resolve(false);
            }, 60 * 1000);
        });
    }

    async play() {
        this.active = true;
        if(!this.words) {
            this.words = await http.getWords();
        }
        this.active = await this.loop();
        this.clear();
        this.grid.innerHTML = '';
        const gameover = document.createElement('div');
        gameover.classList.add('game-over');
        gameover.innerHTML = `Total Score: ${this.totalScore}`;
        this.grid.appendChild(gameover);
    }
}

window.game = new Grid('#game');
window.game.play();
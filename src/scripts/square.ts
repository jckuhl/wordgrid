export default class Square {

    private letter: string;
    private div: HTMLElement;
    private bonus: string;
    private selected: boolean;

    constructor(letter: string) {
        this.div = document.createElement('div');
        this.div.className = 'game-square';
        this.letter = letter;
        this.div.innerHTML = letter;
        this.selected = false;
        this.div.addEventListener('click', ()=> {
            if(this.selected) {
                this.div.classList.remove('selected');
            } else {
                this.div.classList.add('selected');
            }
            this.selected = !this.selected;
        });
    }

    public getDiv(): HTMLElement {
        return this.div;
    }
}
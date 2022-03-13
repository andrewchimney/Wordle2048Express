export default class Tile{
    element;
    x;
    y;
    letter;

    constructor(element, x, y, letter){
        this.element = element;
        this.x = x;
        element.style.setProperty("--x", x);
        this.y= y;
        element.style.setProperty("--y", y);
        this.letter = letter;
    }
    setX(newX){
        this.x = newX;
        this.element.style.setProperty("--x", this.x);
    }
    setY(newY){
        this.y = newY;
        this.element.style.setProperty("--y", this.y);
    }
    getLetter(){
        return this.letter || 0;
    }
}
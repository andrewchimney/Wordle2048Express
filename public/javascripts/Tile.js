export default class Tile{
    element;
    x;
    y;
    letter;
    ch;
    cv;

    constructor(element, x, y, letter){
        this.element = element;
        this.x = x;
        element.style.setProperty("--x", x);
        this.y= y;
        element.style.setProperty("--y", y);
        this.letter = letter;
        this.cv = false;
        this.ch= false;
        this.element.style.setProperty("--ch", this.ch);
        this.element.style.setProperty("--cv", this.cv);
    }
    setX(newX){
        this.x = newX;
        this.element.style.setProperty("--x", this.x);
    }
    setY(newY){
        this.y = newY;
        this.element.style.setProperty("--y", this.y);
    }
    setCh(bool){
        this.ch= bool;
        this.element.style.setProperty("--ch", this.ch);
    }
    setCv(bool){
        this.cv= bool;
        this.element.style.setProperty("--cv", this.cv);
    }
}
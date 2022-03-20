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
    setChTrue(){
        this.ch =true;
        this.element.style.setProperty("--ch", this.ch);
        this.element.style.setProperty("background-color", "green");
    }
    setCvTrue(){
        this.cv =true;
        this.element.style.setProperty("--cv", this.cv);
        this.element.style.setProperty("background-color", "green");
    }
    setChFalse(){
        this.ch =false;
        this.element.style.setProperty("--ch", this.ch);
        this.element.style.setProperty("background-color", "red");
    }
    setCvFalse(){
        this.cv =false;
        this.element.style.setProperty("--cv", this.cv);
        this.element.style.setProperty("background-color", "red");
    }
    setCvhFalse(){
        this.cv =false;
        this.element.style.setProperty("--cv", this.cv);
        this.ch =false;
        this.element.style.setProperty("--ch", this.ch);
        this.element.style.setProperty("background-color", "red");

    }
    isCollapse(){
        return this.cv || this.ch;
    }
}
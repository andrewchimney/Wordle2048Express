export default class Tile{
    element;
    x;
    y;

    constructor(element, x, y){
        this.element = element;
        this.x = x;
        element.style.setProperty("--x", x);
        this.y= y;
        element.style.setProperty("--y", y);
    }
    set x(newX){
        x = newX;
        element.style.setProperty("--x", x);
    }
    set y(newY){
        y = newY;
        element.style.setProperty("--y", y);
    }
}
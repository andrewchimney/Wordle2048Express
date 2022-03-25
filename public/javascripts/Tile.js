export default class Tile {
    element;
    x;
    y;
    letter;
    ch;
    cv;
    value;

    constructor(element, x, y, letter) {
        this.element = element;
        this.x = x;
        element.style.setProperty("--x", x);
        this.y = y;
        element.style.setProperty("--y", y);
        this.letter = letter;
        this.cv = false;
        this.ch = false;
        this.value = this.findValue(letter);
    }
    setX(newX) {
        this.x = newX;
        this.element.style.setProperty("--x", this.x);
    }
    setY(newY) {
        this.y = newY;
        this.element.style.setProperty("--y", this.y);
    }
    setChTrue() {
        this.ch = true;
        this.element.style.setProperty("background-color", "green");
    }
    setCvTrue() {
        this.cv = true;
        this.element.style.setProperty("background-color", "green");
    }
    setChFalse() {
        this.ch = false;
        this.element.style.setProperty("background-color", "red");
    }
    setCvFalse() {
        this.cv = false;
        this.element.style.setProperty("background-color", "red");
    }
    setCvhFalse() {
        this.cv = false;
        this.ch = false;
        this.element.style.setProperty("background-color", "red");

    }
    isCollapse() {
        return this.cv || this.ch;
    }
    findValue(letter) {
        switch (letter) {
            case "A":
            case "E":
            case "I":
            case "L":
            case "N":
            case "O":
            case "R":
            case "S":
            case "T":
            case "U":
                return 1;
            case "D":
            case "G":
                return 2;
            case "B":
            case "C":
            case "M":
            case "P":
                return 3;
            case "F":
            case "H":
            case "V":
            case "W":
            case "Y":
                return 4;
            case "K":
                return 5;
            case "J":
            case "X":
                return 8;
            case "Q":
            case "Z":
                return 10;
        }

    }
}
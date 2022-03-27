import Cell from "./Cell.js"
import Tile from "./Tile.js";
import WordListChecker from "./Checker.js";

export default class Grid {
    elem;
    GRID_SIZE;
    CELL_SIZE;
    GAP_SIZE;
    cellArray;
    tileArray;
    wordlist;
    wordListChecker;
    score;
    numOfTiles;
    vowelCounter;

    constructor(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE) {
        this.wordListChecker = new WordListChecker();
        this.score = 0;
        this.numOfTiles = 0;
        this.vowelCounter=0;
        this.board = board;
        this.gameover = gameover;
        this.GRID_SIZE = GRID_SIZE;
        // this.CELL_SIZE = CELL_SIZE;
        // this.GAP_SIZE = GAP_SIZE;
        // this.board.style.setProperty("--grid_size", this.GRID_SIZE);
        // this.board.style.setProperty("--cell_size", `${this.CELL_SIZE}vmin`);
        // board.style.setProperty("--gap_size", `${this.GAP_SIZE}vmin`);
        // gameover.style.setProperty("--grid_size", this.GRID_SIZE);
        // gameover.style.setProperty("--cell_size", `${this.CELL_SIZE}vmin`);
        // gameover.style.setProperty("--gap_size", `${this.GAP_SIZE}vmin`);
        this.cellArray = new Array(GRID_SIZE);
        this.tileArray = new Array(GRID_SIZE);
        for (let i = 0; i < GRID_SIZE; i++) {
            this.cellArray[i] = new Array(GRID_SIZE).fill(null);
            this.tileArray[i] = new Array(GRID_SIZE).fill(null);
        }
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                let elem = document.createElement("div");
                elem.classList.add("cell");
                board.appendChild(elem);
                this.cellArray[x][y] = new Cell(elem, x, y);
            }
        }
        this.addRandomLetter();
    }

    /* getters and setter*/

    getRow(y) {
        let row = [];
        for (let i = 0; i < this.GRID_SIZE; i++) {
            row.push(this.tileArray[i][y]);
        }
        return row;
    }
    setRow(row, y) {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            this.tileArray[i][y] = row[i];
            if (this.tileArray[i][y]) {
                this.tileArray[i][y].setX(i);
            }
        }
    }
    getColumn(x) {
        return this.tileArray[x];
    }
    setColumn(column, x) {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            this.tileArray[x][i] = column[i];
            if (this.tileArray[x][i]) {
                this.tileArray[x][i].setY(i);
            }
        }
    }
    getTileArray() {
        return this.tileArray;
    }

    /*game logic*/

    addRandomLetter() {
        let elem = document.createElement("div"); //creates div for a tile
        elem.classList.add("tile"); //adds div class to tile
        //TODO make this have better chances for vowels and common letters
        let letter;
        if(this.vowelCounter%3==0){
            letter = Math.floor(Math.random()*5);
            
            switch(letter){
                case 0:
                    letter="A";
                    break;
                case 1:
                    letter="E";
                    break;
                case 2:
                    letter="I";
                    this.vowelCounter++;
                    break;
                case 3:
                    letter="O";
                    break;
                case 4:
                    letter="U";
                    this.vowelCounter++;
                    break;
                default:
                    letter="asfsa"
            }
            
        } else{
            letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);//generates a random letter
        }
        elem.textContent = letter;//sets html = to letter
        board.appendChild(elem); // adds html elem to the board
        //generates positin for tile
        // TODO make this more efficient
        let x = Math.floor(Math.random() * this.GRID_SIZE);
        let y = Math.floor(Math.random() * this.GRID_SIZE);
        while (this.tileArray[x][y]) {
            x = Math.floor(Math.random() * this.GRID_SIZE);
            y = Math.floor(Math.random() * this.GRID_SIZE);
        }

        this.tileArray[x][y] = new Tile(elem, x, y, letter);// creates javascript object tile and adds it to the array
        this.numOfTiles++;
        this.vowelCounter++;
    }
    slide(direction, afterMove) {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            let array;
            if (direction == "left") {
                array = this.getRow(i);
            }
            if (direction == "right") {
                array = this.getRow(i).reverse()
            }
            if (direction == "up") {
                array = this.getColumn(i);
            }
            if (direction == "down") {
                array = this.getColumn(i).reverse();
            }

            if (array[0]) {
                if (array[0].ch && (direction == "left" || direction == "right")) {
                    this.score += array[0].value;
                    array[0].element.remove();
                    this.numOfTiles--;
                    array[0] = null;
                } else if (array[0].cv && (direction == "up" || direction == "down")) {
                    this.score += array[0].value;
                    array[0].element.remove();
                    this.numOfTiles--;
                    array[0] = null;
                }
            }

            for (let tile = 1; tile < this.GRID_SIZE; tile++) {
                if (array[tile]) {
                    if (array[tile].ch && (direction == "left" || direction == "right")) {
                        this.score += array[tile].value;
                        array[tile].element.remove();
                        this.numOfTiles--;
                        array[tile] = null;
                        continue;
                    }
                    if (array[tile].cv && (direction == "up" || direction == "down")) {
                        this.score += array[tile].value;
                        array[tile].element.remove();
                        this.numOfTiles--;
                        array[tile] = null;
                        continue;
                    }
                    for (let nextTile = tile - 1; nextTile > -1; nextTile--) {
                        if (array[nextTile] == null) {
                            array[nextTile] = array[tile];
                            array[tile] = null;
                            tile = nextTile;
                        }
                    }
                }
            }
            if (direction == "left") {
                this.setRow(array, i);
            }
            if (direction == "right") {
                this.setRow(array.reverse(), i);
            }
            if (direction == "up") {
                this.setColumn(array, i);
            }
            if (direction == "down") {
                this.setColumn(array.reverse(), i);
            }

        }
        setTimeout(afterMove, 100);
    }

    /* numOfTiles is a running total of tiles. checkTileGridFull just checks if there are this.GRID_SIZE^2 tiles  */

    checkTileGridFull() {
        if (this.numOfTiles == (this.GRID_SIZE*this.GRID_SIZE)) return true;
        else return false;
    }

    checkMoves() {

        /*clears all tiles of collapse status*/

        let movesAvailable = false;
        for (let x = 0; x < this.GRID_SIZE; x++) {
            for (let y = 0; y < this.GRID_SIZE; y++) {
                if (this.tileArray[x][y]) {
                    this.tileArray[x][y].setCvhFalse();
                }

            }
        }

        /*checks tiles for collapse status */

        for (let xy = 0; xy < this.GRID_SIZE; xy++) {
            let arrayX = this.getColumn(xy);
            let arrayY = this.getRow(xy);
            let word = "";

            /* checks for two letter words vertical and horizontal */

            for (let i = 0; i < 3; i++) {
                if (arrayX[i]) {
                    word += arrayX[i].letter;
                } else {
                    word = "";
                    continue;
                }
                if (arrayX[i + 1]) {
                    word += arrayX[i + 1].letter;
                } else {
                    word = "";
                    continue;
                }
                if (this.wordListChecker.check2(word)) {
                    movesAvailable = true;
                    this.tileArray[xy][i].setCvTrue();
                    this.tileArray[xy][i + 1].setCvTrue();
                }
                word = "";
            }
            for (let i = 0; i < 3; i++) {
                if (arrayY[i]) {
                    word += arrayY[i].letter;
                } else {
                    word = "";
                    continue;
                }
                if (arrayY[i + 1]) {
                    word += arrayY[i + 1].letter;
                } else {
                    word = "";
                    continue;
                }

                if (this.wordListChecker.check2(word)) {
                    movesAvailable = true;
                    this.tileArray[i][xy].setChTrue();
                    this.tileArray[i + 1][xy].setChTrue();
                }
                word = "";

            }

            /*checks for three letter words horizontal and vertical*/

            for (let i = 0; i < 2; i++) {
                if (arrayX[i]) {
                    word += arrayX[i].letter
                } else {
                    word = "";
                    continue;
                }
                if (arrayX[i + 1]) {
                    word += arrayX[i + 1].letter
                } else {
                    word = "";
                    continue;
                }
                if (arrayX[i + 2]) {
                    word += arrayX[i + 2].letter
                } else {
                    word = "";
                    continue;
                }
                if (this.wordListChecker.check3(word)) {
                    movesAvailable = true;
                    this.tileArray[xy][i].setCvTrue();
                    this.tileArray[xy][i + 1].setCvTrue();
                    this.tileArray[xy][i + 2].setCvTrue();
                }
                word = "";
            }
            for (let i = 0; i < 2; i++) {
                if (arrayY[i]) {
                    word += arrayY[i].letter
                } else {
                    word = "";
                    continue;
                }
                if (arrayY[i + 1]) {
                    word += arrayY[i + 1].letter
                } else {
                    word = "";
                    continue;
                }
                if (arrayY[i + 2]) {
                    word += arrayY[i + 2].letter
                } else {
                    word = "";
                    continue;
                }
                if (this.wordListChecker.check3(word)) {
                    movesAvailable = true;
                    this.tileArray[i][xy].setChTrue();
                    this.tileArray[i + 1][xy].setChTrue();
                    this.tileArray[i + 2][xy].setChTrue();
                }
                word = "";
            }

            /*checks for four letter words horizontally or vertically */

            for (let i = 0; i < 4; i++) {
                if (arrayX[i]) {
                    word += arrayX[i].letter
                } else {
                    word = "";
                    break;
                }
            }
            if (this.wordListChecker.check4(word)) {
                movesAvailable = true;
                this.tileArray[xy][0].setCvTrue();
                this.tileArray[xy][1].setCvTrue();
                this.tileArray[xy][2].setCvTrue();
                this.tileArray[xy][3].setCvTrue();
            }
            word = "";
            for (let i = 0; i < 4; i++) {
                if (arrayY[i]) {
                    word += arrayY[i].letter
                } else {
                    word = "";
                    break;
                }
            }
            if (this.wordListChecker.check4(word)) {
                movesAvailable = true;
                this.tileArray[0][xy].setChTrue();
                this.tileArray[1][xy].setChTrue();
                this.tileArray[2][xy].setChTrue();
                this.tileArray[3][xy].setChTrue();
            }
            word="";
        }
        for(let r=0;r<this.GRID_SIZE;r++){
            for(let c=0;c<this.GRID_SIZE;c++){
                if( this.tileArray[r][c]!=null && this.tileArray[r][c].ch==true && this.tileArray[r][c].cv==true){
                    this.tileArray[r][c].setCvhTrue();
                }
            }
        }
       return movesAvailable;
    }
}
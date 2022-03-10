import Cell from "./Cell.js"
import Tile from "./Tile.js";

export default class Grid{
    elem;
    GRID_SIZE;
    CELL_SIZE;
    GAP_SIZE;
    cellArray;
    tileArray;
    wordlist;

    constructor(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE){
        this.GRID_SIZE = GRID_SIZE;
        this.CELL_SIZE = CELL_SIZE;
        this.GAP_SIZE = GAP_SIZE;
        board.style.setProperty("--grid_size", GRID_SIZE);
        board.style.setProperty("--cell_size", `${CELL_SIZE}vmin`);
        board.style.setProperty("--grid_size", `${GAP_SIZE}vmin`);
        gameover.style.setProperty("--grid_size", GRID_SIZE);
        gameover.style.setProperty("--cell_size", `${CELL_SIZE}vmin`);
        gameover.style.setProperty("--grid_size", `${GAP_SIZE}vmin`);
        this.cellArray=new Array(GRID_SIZE);
        this.tileArray=new Array(GRID_SIZE);
        for(let i=0; i< GRID_SIZE;i++){
            this.cellArray[i]=new Array(GRID_SIZE).fill(null);
            this.tileArray[i]=new Array(GRID_SIZE).fill(null);
        }
        for(let x =0;x<5;x++){
            for(let y=0;y<5;y++){
                let elem = document.createElement("div");
                elem.classList.add("cell");
                board.appendChild(elem);
                this.cellArray[x][y] = new Cell(elem, x, y);
            }
        }
    }
    addRandomLetter(){
        let elem = document.createElement("div");
        elem.classList.add("tile");
        let letter = String.fromCharCode(Math.floor(Math.random()*26)+65);
        elem.textContent= letter;
        board.appendChild(elem);
        let x= Math.floor(Math.random()*this.GRID_SIZE);
        let y= Math.floor(Math.random()*this.GRID_SIZE);
        while(this.tileArray[x][y]){
            x= Math.floor(Math.random()*this.GRID_SIZE);
            y= Math.floor(Math.random()*this.GRID_SIZE);
        }
        this.tileArray[x][y]= new Tile(elem, x, y, letter);
    }
    getRow(y){
        let row =[];
        for(let i=0;i<this.GRID_SIZE;i++){
            row.push(this.tileArray[i][y]);
        }
        return row;
    }
    setRow(row, y){
        for(let i=0;i<this.GRID_SIZE;i++){
            this.tileArray[i][y]=row[i];
            if(this.tileArray[i][y]){
                this.tileArray[i][y].setX(i);
            }
        }
    }
    getColumn(x){
        return this.tileArray[x];
    }
    setColumn(column, x){
        for(let i=0;i<this.GRID_SIZE;i++){
            this.tileArray[x][i]=column[i];
            if(this.tileArray[x][i]){
                this.tileArray[x][i].setY(i);
            }
        }
    }
    slide(direction){
        for(let i=0;i<this.GRID_SIZE;i++){
            let array;
            if(direction=="left"){
                array= this.getRow(i);
            }
            if(direction=="right"){
                array=this.getRow(i).reverse()
            }
            if(direction=="up"){
                array= this.getColumn(i);
            }
            if(direction=="down"){
                array= this.getColumn(i).reverse();
            }

                for(let tile=1;tile<this.GRID_SIZE;tile++){
                    if(array[tile]){
                        for(let nextTile=tile-1;nextTile>-1;nextTile--){
                            if(array[nextTile]==null){
                                array[nextTile]=array[tile];
                                array[tile]=null;
                                tile=nextTile;
                            }
                        }
                    }
                }
            if(direction=="left"){
                this.setRow(array, i);
            }    
            if(direction=="right"){
                this.setRow(array.reverse(), i);
            }
            if(direction=="up"){
                this.setColumn(array, i);
            }
            if(direction=="down"){
                this.setColumn(array.reverse(), i);
            }
            
        }
        
    }
}
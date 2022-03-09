import Cell from "./Cell.js"
import Tile from "./Tile.js";

export default class Grid{
    elem;
    GRID_SIZE;
    CELL_SIZE;
    GAP_SIZE;
    cellArray;
    tileArray;

    constructor(elem, GRID_SIZE, CELL_SIZE, GAP_SIZE){
        this.GRID_SIZE = GRID_SIZE;
        this.CELL_SIZE = CELL_SIZE;
        this.GAP_SIZE = GAP_SIZE;
        elem.style.setProperty("--grid_size", GRID_SIZE)
        elem.style.setProperty("--cell_size", `${CELL_SIZE}vmin`)
        elem.style.setProperty("--grid_size", `${GAP_SIZE}vmin`)
        this.cellArray=[];
        this.tileArray=[];
        for(let i =0;i<25;i++){
            let elem = document.createElement("div");
            elem.classList.add("cell");
            board.appendChild(elem);
            this.cellArray[i] = new Cell(elem, i%GRID_SIZE, Math.floor(i/GRID_SIZE));
        }
    }
    addRandomLetter(){
        let elem = document.createElement("div");
        elem.classList.add("tile");
        let letter = String.fromCharCode(Math.floor(Math.random()*27)+65);
        elem.textContent= letter;
        board.appendChild(elem);
        let i= Math.floor(Math.random()*(this.GRID_SIZE*this.GRID_SIZE));
        console.log(i);
        this.tileArray.push(new Tile(elem, i%this.GRID_SIZE, Math.floor(i/this.GRID_SIZE), letter));
        
    }
}
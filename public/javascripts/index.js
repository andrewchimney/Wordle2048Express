
import Grid from "./Grid.js"

const GRID_SIZE = 5;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
const board = document.getElementById("board");
const grid = new Grid(board, GRID_SIZE, CELL_SIZE, GAP_SIZE);
grid.addRandomLetter();

setUpInput();
























function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}


function handleInput(e){
    console.log(e.key);
    switch (e.key){
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowUp":
            moveUp();
            break;
        default:
            console.log("use arrow key");
    }
    setUpInput();
}

function moveLeft(){

}
function moveRight(){
    
}
function moveDown(){
    
}
function moveUp(){
    
}





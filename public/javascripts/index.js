import Grid from "./Grid.js"
/* Index.js is the main script of the game. It uses functions from the grid classes to operate the game*/
/* variables for board styles*/
const GRID_SIZE = 5;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
const board = document.getElementById("board");
const gameover = document.getElementById("gameover");
const grid = new Grid(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE);
grid.addRandomLetter();
setUpInput();
























function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}


function handleInput(e){
    console.log(e.key);
    setTimeout(function(){
                grid.addRandomLetter();
                setUpInput();
                }, 130);
    switch (e.key){
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown()
            break;
        case "ArrowUp":
            moveUp();
            break;
        
        default:
            console.log("use arrow key");
    }
}

function moveLeft(){
    grid.slide("left");
}
function moveRight(){
    grid.slide("right");
}
function moveDown(){
    grid.slide("down");
}
function moveUp(){
    grid.slide("up");
    
}




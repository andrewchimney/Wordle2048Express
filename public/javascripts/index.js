import Grid from "./Grid.js"
/* Index.js is the main script of the game. It uses functions from the grid classes to operate the game*/
/* variables for board styles*/

const GRID_SIZE = 4;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
const board = document.getElementById("board");
const gameover = document.getElementById("gameover");
const grid = new Grid(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE);
grid.addRandomLetter();
setUpInput();

document.querySelectorAll(".newGame")[0].onclick = newGame;
document.querySelectorAll(".newGame")[1].onclick = newGame;
window.addEventListener("keydown", function(e){
    if(e.key=="Enter") newGame();
});






















function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}


function handleInput(e){
    switch (e.key){
        case "ArrowLeft":
            setTimeout(afterMove, 130);
            moveLeft();
            break;
        case "ArrowRight":
            setTimeout(afterMove, 130);
            moveRight();
            break;
        case "ArrowDown":
            setTimeout(afterMove, 130);
            moveDown()
            break;
        case "ArrowUp":
            setTimeout(afterMove, 130);
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
function newGame(){
    grid.tileArray=new Array(GRID_SIZE);
    for(let i=0; i< GRID_SIZE;i++){
        grid.tileArray[i]=new Array(GRID_SIZE).fill(null);
    }
    let elemArray = document.querySelectorAll(".tile");
    for(let j=0;j<elemArray.length;j++){
        elemArray[j].remove();
    }
    gameover.style.setProperty("display", "none");
    grid.addRandomLetter();
    setUpInput();
}
function afterMove(){
    if(true){
        grid.addRandomLetter();
        grid.checkMoves();
        if(grid.checkGameOver()){
            grid.checkGameOver();
            gameover.style.setProperty("display", "unset")
        }else setUpInput();
    } else setUpInput();
}




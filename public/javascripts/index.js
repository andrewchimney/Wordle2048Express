import Grid from "./Grid.js"
/* Index.js is the main script of the game. It uses functions from the grid classes to operate the game*/
/* variables for board styles*/

const GRID_SIZE = 4;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
const board = document.getElementById("board");
const gameover = document.getElementById("gameover");
const currentScore= document.getElementsByClassName("currentScore");
const bestScore= document.getElementsByClassName("bestScore");

let best=localStorage.getItem("best");
if(!best){
    localStorage.setItem("best",0);
}
if(best){
    bestScore[0].textContent=best;
    bestScore[1].textContent=best;
}
const grid = new Grid(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE);
grid.addRandomLetter();
let touchstartX;
let touchstartY;
let touchendX;
let touchendY
setUpInput();
document.querySelector(".bitcoin").onclick = bitcoinCopy;
document.querySelectorAll(".newGame")[0].onclick = newGame;
document.querySelectorAll(".newGame")[1].onclick = newGame;
window.addEventListener("keydown", function(e){
    if(e.key=="Enter") newGame();
});
window.addEventListener("keydown", function(e){
    e.preventDefault();
}); //stop scrolling on arrow keys
board.addEventListener("touchstart", function(e){
    e.preventDefault();
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
    console.log("touched")
});
board.addEventListener('touchend', function (e) {
    e.preventDefault();
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleSwipe();
});




function handleSwipe() {
    let traveledX= touchendX-touchstartX;
    let traveledY= touchendY-touchstartY;
    if(Math.abs(traveledX)>Math.abs(traveledY)){
        if(traveledX>0){
            moveRight();
        } else moveLeft();
    } else{
        if(traveledY<0){
            moveUp();
        } else moveDown();
    }
}

















function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}


function handleInput(e){
    switch (e.key){
        
        case "ArrowLeft":
            moveLeft();
            break;
        case "a":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "d":
            moveRight();
            break;
        case "ArrowDown":
            moveDown()
            break;
        case "s":
            moveDown()
            break;
        case "ArrowUp":
            moveUp();
            break;
        case "w":
            moveUp();
            break;
        default:
            setUpInput();
    }
}

function moveLeft(){
    setTimeout(afterMove, 130);
    grid.slide("left");
}
function moveRight(){
    setTimeout(afterMove, 130);
    grid.slide("right");
}
function moveDown(){
    setTimeout(afterMove, 130);
    grid.slide("down");
}
function moveUp(){
    setTimeout(afterMove, 130);
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
    grid.score=0;
    currentScore[0].textContent= grid.score;
    gameover.style.setProperty("visibility", "hidden");
    grid.addRandomLetter();
    setUpInput();
}
function afterMove(){
        currentScore[0].textContent= grid.score;
        grid.addRandomLetter();
        if(!grid.checkMoves() && grid.checkGameOver()){
            if(localStorage.getItem("best")<grid.score){
                localStorage.setItem("best",grid.score);
                bestScore[0].textContent=grid.score;
                bestScore[1].textContent=grid.score;
            }
            currentScore[1].textContent =grid.score
            gameover.classList.add("show");
            gameover.style.setProperty("visibility", "unset");
        }else setUpInput();
}
function bitcoinCopy(){
    navigator.clipboard.writeText("bc1qxadr4ln7sqrlqcr03mh87a45avgzd8e3d3vep5");
    alert("Copied to clipboard")
}




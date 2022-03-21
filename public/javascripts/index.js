import Grid from "./Grid.js"

/*variable declararations*/

const GRID_SIZE = 4;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
let touchstartX;
let touchstartY;
let touchendX;
let touchendY;
const board = document.getElementById("board");
const gameover = document.getElementById("gameover");
const currentScore = document.getElementsByClassName("currentScore");
const bestScore = document.getElementsByClassName("bestScore");
const grid = new Grid(board, gameover, GRID_SIZE, CELL_SIZE, GAP_SIZE);

/*local storage*/

let best = localStorage.getItem("best");
if (!best) localStorage.setItem("best", 0);
bestScore[0].textContent = best;
bestScore[1].textContent = best;

/*event listeners*/

setUpInput();
document.querySelector(".bitcoin").onclick = bitcoinCopy;
document.querySelectorAll(".newGame")[0].onclick = newGame;
document.querySelectorAll(".newGame")[1].onclick = newGame;
window.addEventListener("keydown", function (e) { if (e.key == "Enter") newGame(); });
window.addEventListener("keydown", function (e) { e.preventDefault(); }); //stop scrolling on arrow keys
board.addEventListener("touchstart", function (e) {
    e.preventDefault();
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});
board.addEventListener('touchend', function (e) {
    e.preventDefault();
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    handleSwipe();
});

/*input handlers*/

function setUpInput() {
    window.addEventListener("keydown", handleInput, { once: true });
}
function handleSwipe() {
    let traveledX = touchendX - touchstartX;
    let traveledY = touchendY - touchstartY;
    if (Math.abs(traveledX) > Math.abs(traveledY)) {
        if (traveledX > 0) {
            moveRight();
        } else moveLeft();
    } else {
        if (traveledY < 0) {
            moveUp();
        } else moveDown();
    }
}
function handleInput(e) {
    switch (e.key) {

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

function moveLeft() {
    setTimeout(afterMove, 130);
    grid.slide("left");
}
function moveRight() {
    setTimeout(afterMove, 130);
    grid.slide("right");
}
function moveDown() {
    setTimeout(afterMove, 130);
    grid.slide("down");
}
function moveUp() {
    setTimeout(afterMove, 130);
    grid.slide("up");

}
function newGame() {
    grid.tileArray = new Array(GRID_SIZE);
    for (let i = 0; i < GRID_SIZE; i++) {
        grid.tileArray[i] = new Array(GRID_SIZE).fill(null);
    }
    let elemArray = document.querySelectorAll(".tile");
    for (let j = 0; j < elemArray.length; j++) {
        elemArray[j].remove();
    }
    grid.score = 0;
    currentScore[0].textContent = grid.score;
    gameover.style.setProperty("visibility", "hidden");
    grid.numOfTiles = 0;
    grid.addRandomLetter();
    setUpInput();
}
function afterMove() {
    currentScore[0].textContent = grid.score;
    grid.addRandomLetter();
    if (!grid.checkMoves() && grid.checkTileGridFull()) {
        if (localStorage.getItem("best") < grid.score) {
            localStorage.setItem("best", grid.score);
            bestScore[0].textContent = grid.score;
            bestScore[1].textContent = grid.score;
        }
        currentScore[1].textContent = grid.score
        gameover.classList.add("show");
        gameover.style.setProperty("visibility", "unset");
    } else setUpInput();
}
function bitcoinCopy() {
    navigator.clipboard.writeText("bc1qxadr4ln7sqrlqcr03mh87a45avgzd8e3d3vep5");
    alert("Copied to clipboard")
}

/*basic game logic goes as follows:*/

//browser loads game
//input is set up
//tile is added
//gameover is checked
    //possible moves are checked
    //grid is full is checked
//move is detected




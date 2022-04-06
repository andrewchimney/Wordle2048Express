import Grid from "./Grid.js"

/*variable declararations*/

const GRID_SIZE = 4;
const CELL_SIZE = 17;
const GAP_SIZE = 1.5;
let touchstartX;
let touchstartY;
let touchendX;
let touchendY;
const navigator= window.navigator;
const BOARDELEM = document.getElementById("board");
const GAMEOVERELEM = document.getElementById("gameover");
const CURRENTSCOREELEM = document.getElementsByClassName("currentScore");
const BESTSCOREELEM = document.getElementsByClassName("bestScore");
const grid = new Grid(BOARDELEM, GAMEOVERELEM, GRID_SIZE, CELL_SIZE, GAP_SIZE);
let tileArrayOld = JSON.stringify(grid.tileArray);


/*local storage*/
BESTSCOREELEM[0].textContent = 0;
BESTSCOREELEM[1].textContent = 0;
let best = localStorage.getItem("best");
if(best){
    BESTSCOREELEM[0].textContent = best;
    BESTSCOREELEM[1].textContent = best;
}

/*event listeners*/

setUpInput();
document.querySelector(".bitcoin").onclick = bitcoinCopy;
document.querySelectorAll(".newGame")[0].onclick = newGame;
document.querySelectorAll(".newGame")[1].onclick = newGame;
document.querySelector(".share").onclick = shareCopy;
window.addEventListener("keydown", function (e) { if (e.key == "Enter") newGame(); });
window.addEventListener("keydown", function (e) { e.preventDefault(); }); //stop scrolling on arrow keys
BOARDELEM.addEventListener("touchstart", function (e) {
    e.preventDefault();
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});
BOARDELEM.addEventListener('touchend', function (e) {
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
        case "a":
            moveLeft();
            break;
        case "ArrowRight":
        case "d":
            moveRight();
            break;
        case "ArrowDown":
        case "s":
            moveDown()
            break;
        case "ArrowUp":
        case "w":
            moveUp();
            break;
        default:
            setUpInput();
    }
}

function moveLeft() {
    grid.slide("left", afterMove);
}
function moveRight() {
    grid.slide("right", afterMove);
}
function moveDown() {
    grid.slide("down", afterMove);
}
function moveUp() {
    grid.slide("up", afterMove);

}
function afterMove() {
    if (!(tileArrayOld == JSON.stringify(grid.tileArray))) {
        CURRENTSCOREELEM[0].textContent = grid.score;
        grid.addRandomLetter();
        if (!grid.checkMoves() && grid.checkTileGridFull()) {
            gameover();
        } else setUpInput();
        tileArrayOld = JSON.stringify(grid.tileArray);
    } else setUpInput();
}
function gameover() {
    if (localStorage.getItem("best") < grid.score) {
        localStorage.setItem("best", grid.score);
        BESTSCOREELEM[0].textContent = grid.score;
        BESTSCOREELEM[1].textContent = grid.score;
    }
    CURRENTSCOREELEM[1].textContent = grid.score
    GAMEOVERELEM.classList.add("show");
    GAMEOVERELEM.style.setProperty("display", "unset");
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
    CURRENTSCOREELEM[0].textContent = grid.score;
    GAMEOVERELEM.style.setProperty("visibility", "hidden");
    grid.numOfTiles = 0;
    grid.addRandomLetter();
    setUpInput();
}
function bitcoinCopy() {
    navigator.clipboard.writeText("bc1qxadr4ln7sqrlqcr03mh87a45avgzd8e3d3vep5");
    copyToaster();
}
function shareCopy() {
    let text = `I got ${grid.score} `;
    if( grid.score<100){
        text+= "🤡"
    } else if(grid.score<500){
        text+="🥳";
    }else{
        text+= "👑"
    }
    if(!navigator.canShare){
        navigator.clipboard.writeText(`wordle2048.com ${text}`);
        copyToaster();
    } else{
        let shareData = {
            title: 'Wordle2048',
            url: 'https://wordle2048.com',
            text: text,
          };
          navigator.share(shareData);
    } 

}
function copyToaster(){    
    let toaster = document.createElement("div"); 
    toaster.classList.add("toaster");
    toaster.textContent= "copied to clipboard";
    document.body.appendChild(toaster);
    setTimeout(()=> {document.body.removeChild(toaster)}, 3000);
}

/*basic game logic goes as follows:*/

//browser loads game
//input is set up
//tile is added
//gameover is checked
    //possible moves are checked
    //grid is full is checked
//move is detected




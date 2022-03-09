



setUpInput();

function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}






function handleInput(e){
    console.log(e.key);
    tile.style.setProperty("--x", 0);
    setUpInput();

}
let tile = document.createElement("div");
tile.classList.add("tile");
let board = document.getElementById("board");
board.append(tile);





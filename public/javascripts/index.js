



setUpInput();

function setUpInput(){
    window.addEventListener("keydown", handleInput, {once: true});
}






function handleInput(e){
    console.log(e.key);
    setUpInput();
}



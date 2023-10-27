
  function mouseDownHandler(e) {
    stash.forEach(gamepiece => {if(mouseOnObj(mouseX,mouseY,gamepiece)==true) {if(gamepiece.mousePressed == false) {gamepiece.mousePressed = true; objPressed = gamepiece }}})
    
    gameLoopStop = 0
    startGameLoop(60);
  }

  function mouseUpHandler(e) {

    touchEndHandler(null)

    if (objPressed !== null) { objPressed.mousePressed = false;}
   
    objPressed = null;
  }

  function touchStartHandler(e) {
    const rect = document.querySelector('#gameWindow').getBoundingClientRect();
    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    mouseX = (touch.clientX - (rect.left));
    mouseY = (touch.clientY - (rect.top));
    stash.forEach(gamepiece => {if(mouseOnObj(mouseX,mouseY,gamepiece)==true) {if(gamepiece.mousePressed == false) {gamepiece.mousePressed = true; objPressed = gamepiece }}})
    
    gameLoopStop = 0
    startGameLoop(60);
  }

  function touchEndHandler(e) {
    
    

    //place piece if put in valid spot
    let isValid = false
    
    tiles.forEach(tile => {if(tile.isHovering==true){tile.inUse=true;tile.isHovering=false;isValid = true}})
    //add score
    if(isValid == true) 
    {
    
    addToScore(objPressed.squares.length)
    }
    //find piece index
    let pieceIndex = stash.findIndex(el => {return el.no == objPressed.no})
    //remove piece from stash
    if(isValid == true){stash.splice(pieceIndex,1);objPressed = null; } else {objPressed.mousePressed = false; objPressed = null; }
    
    //remove inUse tiles if highlighted
    let tileHighlightCount = 0
    tiles.forEach(tile => {if(tile.isHighlighting==true){tile.inUse=false;tile.isHighlighting=false; tileHighlightCount +=1}})
    //add extra score
    if(isValid == true){
    currentCombo += validClears
    addToScore(tileHighlightCount * currentCombo)
    checkPiecesForAvailablePlacements();
    if (validClears == 0 && isValid == true) {currentCombo = 1;}
    playComboSound(currentCombo);
    document.querySelector("#currentCombo").innerHTML = currentCombo + 'X';
    }

    let cantBePlacedCount = 0
    stash.forEach(piece => {if(piece.canBePlaced == false){cantBePlacedCount+=1}})

    //trigger game over
    if (cantBePlacedCount == stash.length && stash.length !== 0){
      document.querySelector("#finalScoreTxt").innerHTML = "Final Score: " + currentScore ;openModal("gameOverModal"); 
      if(currentScore > bestScore){
        localStorage.setItem("bestScore",currentScore)}; 
        clearProgress()
      return;} 

      //fill stash if empty
      if(stash.length == 0) {
        fillStash();
      }

      
    gameLoopStop = 1
    tl.clear()
    tl.kill()
    saveProgress()
    

  }

  function moveHandler(e) {
    const rect = document.querySelector('#gameWindow').getBoundingClientRect();
    mouseX = (e.clientX - (rect.left));
    mouseY = (e.clientY - (rect.top));


  }

  function touchMoveHandler(e) {
    const rect = document.querySelector('#gameWindow').getBoundingClientRect();
    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    mouseX = (touch.clientX - (rect.left / ratio)) * ratio;
    mouseY = (touch.clientY - (rect.top / ratio)) * ratio;
     
  }

function resizeWindow(e) {
    
    //saveProgress(); //saves progress just in case there is no data
    setSizing(); //sets tile and element sizing 
    //loadProgress(); //load progress setting new sizing on tiles in array

    saveProgress(); //saves tiles with new sizing
    loadProgress(); //load those new tiles

    //redraw
    gameLoopStop = 1;
    startGameLoop(60);

}
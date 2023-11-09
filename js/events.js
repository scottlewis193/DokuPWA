
  function mouseDownHandler(e) {
    stash.GamePieces.forEach(gamepiece => {if(mouseOnObj(mouseX,mouseY,gamepiece)==true) {if(gamepiece.mousePressed == false) {gamepiece.mousePressed = true; objPressed = gamepiece }}})
    
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
    stash.GamePieces.forEach(gamepiece => {if(mouseOnObj(mouseX,mouseY,gamepiece)==true) {if(gamepiece.mousePressed == false) {gamepiece.mousePressed = true; objPressed = gamepiece }}})
    
    gameLoopStop = 0
    startGameLoop(60);
  }

  function touchEndHandler(e) {
    
    

    //place piece if put in valid spot
    let isValid = false
    
    board.tiles.forEach(tile => {if(tile.isHovering==true){tile.inUse=true;tile.isHovering=false;isValid = true}})
    //add score
    if(isValid == true) 
    {
    
    addToScore(objPressed.squares.length)
    }
    //find piece index
    let pieceIndex = stash.GamePieces.findIndex(el => {return el.no == objPressed.no})
    //remove piece from stash
    if(isValid == true){stash.GamePieces.splice(pieceIndex,1);objPressed = null; } else {objPressed.mousePressed = false; objPressed = null; }
    
    //remove inUse tiles if highlighted
    let tileHighlightCount = 0
    board.tiles.forEach(tile => {if(tile.isHighlighting==true){tile.inUse=false;tile.isHighlighting=false; tileHighlightCount +=1}})
    //add extra score
    if(isValid == true){
    currentCombo += validClears
    addToScore(tileHighlightCount * currentCombo)
    stash.checkForAvailablePlacements();
    if (validClears == 0 && isValid == true) {currentCombo = 1;}
    playComboSound(currentCombo);
    document.querySelector("#currentCombo").innerHTML = currentCombo + 'X';
    }

    let cantBePlacedCount = 0
    stash.GamePieces.forEach(piece => {if(piece.canBePlaced == false){cantBePlacedCount+=1}})

    //trigger game over
    if (cantBePlacedCount == stash.GamePieces.length && stash.GamePieces.length !== 0){
      document.querySelector("#finalScoreTxt").innerHTML = "final score: " + currentScore ;openModal("gameOverModal"); 
      if(currentScore > bestScore){
        localStorage.setItem("bestScore",currentScore)}; 
        clearProgress()
      return;} 

      //fill stash if empty
      if(stash.GamePieces.length == 0) {
        stash.fill();
      }

      
    gameLoopStop = 1
    try {
      tl.clear()
      tl.kill()
    } catch (error) {
    }

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
    mouseX = (touch.clientX - (rect.left)) 
    mouseY = (touch.clientY - (rect.top))
     
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
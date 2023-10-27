
const channel4Broadcast = new BroadcastChannel('channel4');

channel4Broadcast.onmessage = (event) => {
  let value = event.data;
  //setCookie('version',value,365)
  localStorage.setItem('version',value)
}

//getVersionCookie()

//css color variables
let tileColor = getComputedStyle(document.body).getPropertyValue('--tileColor');
let tileAltColor = getComputedStyle(document.body).getPropertyValue('--tileAltColor');
let bgColor = getComputedStyle(document.body).getPropertyValue('--bgColor');
let bgAltColor = getComputedStyle(document.body).getPropertyValue('--bgAltColor');
let btnColor = getComputedStyle(document.body).getPropertyValue('--btnColor');
let btnDisabledColor = getComputedStyle(document.body).getPropertyValue('--btnDisabledColor');
let btnAltColor = getComputedStyle(document.body).getPropertyValue('--btnAltColor');
let txtColor = getComputedStyle(document.body).getPropertyValue('--txtColor');
let txtAltColor = getComputedStyle(document.body).getPropertyValue('--txtAltColor'); 
let highlightColor = getComputedStyle(document.body).getPropertyValue('--highlightColor');

//OPTIONS
let darkmode = localStorage.getItem("darkmode")

getVersion()
getOptions()



const gridSize = 9
const ratio = window.devicePixelRatio;
const c = document.querySelector('#gameWindow').getContext("2d");


let frmReqNo

let tileSize
let tiles = [];
let stash = [];
let currentHoveringTiles = [];

let mouseX = null;
let mouseY = null;
let curHoverX = 0;
let curHoverY = 0;
let newHoverX = 0;
let newHoverY = 0;
let objPressed = null;
let currentScore = 0;
let bestScore = 0;
let currentCombo = 1;
let validClears = 0;
let tl

let centerOffsetX = (tileSize * (gridSize / 2)) - (ratio*4) 


var gameLoopStop = 1;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});



let touchsupported = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function isPwa() {
  return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
  );
}

const andref = document.referrer.includes('android-app://');

if(isPwa()== true || andref == true) {console.log("PWA:true");} else 
{console.log("PWA:false")
if(window.location.href !== "http://127.0.0.1:8080/" && window.location.href !== "http://localhost:8080/" && window.location.href !== "http://192.168.0.3:8080/") {
  document.querySelector("#installModal").style.display = "block"
 }
}



window.addEventListener("resize", function(e) {resizeWindow(e)})

if (touchsupported()) {
console.log("touchsupported:true")
document.querySelector('#gameWindow').addEventListener("touchstart",function(e){touchStartHandler(e)})
document.querySelector('#gameWindow').addEventListener("touchend",function(e){touchEndHandler(e)})
document.querySelector('#gameWindow').addEventListener('touchmove',function(e) {touchMoveHandler(e)})
}else{
  console.log("touchsupported:false")
document.querySelector('#gameWindow').addEventListener("mousedown",function(e){mouseDownHandler(e)})
document.querySelector('#gameWindow').addEventListener("mouseup",function(e){mouseUpHandler(e)})
document.querySelector('#gameWindow').addEventListener('mousemove',function(e) {moveHandler(e)})
}


  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }


  const installApp = document.getElementById('installBtn');

  installApp.addEventListener('click', async () => {
      if (deferredPrompt !== null) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
              deferredPrompt = null;
              
          } else {
          }
          location.reload();
      }
  });




  
function load() {
  //make menu invisible
  document.querySelector("#mainMenuModal").style.display = 'none'


  //reset score 
  setScore(0)

  //reset stash
  stash = [];

  //reset tiles
  tiles = [];

  //set app sizing
  setSizing();
  //gen tiles
  generateTiles();
  //cap to 60FPS
  startGameLoop(60);
  //get best score
  getBestScoreCookie();

  if (localStorage.getItem("progressTiles") === null) {
    localStorage.setItem("progressTiles","")
    localStorage.setItem("progressStash","")
    localStorage.setItem("progressStats","")
    fillStash()
  }

  if (localStorage.getItem("progressTiles") !== "") {
    loadProgress();
  } else {fillStash()}

  }


  function startGameLoop(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
  
    gameLoop();
}

function gameLoop() {


  // stop
  if (gameLoopStop > 0) {
      gameLoopStop += 1
    if (gameLoopStop == 10) {
    window.cancelAnimationFrame(frmReqNo)
    return;
    }
    }

  frmReqNo = window.requestAnimationFrame(gameLoop);
  

   // calc elapsed time since last loop

   now = Date.now();
   elapsed = now - then;

   // if enough time has elapsed, draw the next frame

   if (elapsed > fpsInterval) {

       // Get ready for next frame by setting then=now, but...
       // Also, adjust for fpsInterval not being multiple of 16.67
       then = now - (elapsed % fpsInterval);
    


c.clearRect(0,0,document.querySelector('#gameWindow').width,document.querySelector('#gameWindow').height)

if (newHoverX !== curHoverX || newHoverY !== curHoverY) {
tl = gsap.timeline()
  tiles.forEach(tile => {tile.colorAlpha = 0; if(tile.isHovering){tl.to(tile,{colorAlpha:1, duration:2, overwrite:true},"tile")}})
}

tiles.forEach(tile => {tile.update()})


//draw missing line edges
c.strokeStyle = 'black'
c.lineWidth = 1
c.beginPath()
c.moveTo(((gridSize) * tileSize) + centerOffsetX,0)
c.lineTo(((gridSize) * tileSize) + centerOffsetX,((gridSize) * tileSize))
c.moveTo(((gridSize) * tileSize) + centerOffsetX,((gridSize) * tileSize))
c.lineTo(0 + centerOffsetX,((gridSize) * tileSize))
c.stroke()

stash.forEach(gamepiece => {gamepiece.update()})





if (objPressed !== null) {
  detectValidPlacement()
}

// c.fillStyle = 'white'
// c.fillText(mouseX + ' ' + mouseY,10,10)
}

}




  function checkPiecesForAvailablePlacements() {

    // //Get inuse tiles
    // let iTiles = [];
    // tiles.forEach(tile => {if(tile.inUse == true){iTiles.push(tile)}})

    stash.forEach(piece => {
      piece.canBePlaced = false
      for (let y = 0; y < gridSize; y++) {

        for (let x = 0; x < gridSize; x++) {

          let validSquares = 0
          piece.squares.forEach(square => {
            
            let testTile = tiles[tiles.findIndex(el => {return el.gridPosition.x == square.x + x && el.gridPosition.y == square.y + y })]
            
            if (testTile !== undefined) {
            if (testTile.inUse == false) {
              validSquares += 1 
            }
          }

            })

          
          if (validSquares == piece.squares.length) {piece.canBePlaced = true; break;}

        }
        if (piece.canBePlaced == true) {break;}
      }

    })
  }

function detectClearTiles() {
    

    let rows = [];
    for (let x = 0; x < gridSize; x++) {rows.push({id: x,valid: false})}
    let cols = [];
    for (let y = 0; y < gridSize; y++) {cols.push({id: y,valid: false})}
    let boxes = [];
    for (let i = 0; i < Math.pow(gridSize/3,2); i++) {boxes.push({id: i,valid:false})}




//get all inuse and hovering tiles
let iTiles = [];
tiles.forEach(tile => {if(tile.inUse == true || tile.isHovering == true){iTiles.push(tile)}})
    
    //cols
    for (let x = 0; x < gridSize; x++)  
      for(let y = 0; y < gridSize; y++){
      let testTile = iTiles[iTiles.findIndex(el => {return el.gridPosition.x == x && el.gridPosition.y == y})]
        if (testTile == undefined) {
          cols[x].valid = false
          break
          } else {
          cols[x].valid = true
        }
    }
  
  

    //rows
    for (let y = 0; y < gridSize; y++)    
    for(let x = 0; x < gridSize; x++){
        let testTile = iTiles[iTiles.findIndex(el => {return el.gridPosition.x == x && el.gridPosition.y == y })]
        if (testTile == undefined) {
          rows[y].valid = false
          break
          } else {
          rows[y].valid = true
        }
    }

    //boxes
    for (let i = 0; i < boxes.length; i++)
    {

   

    for (let y = 0; y < 3; y++)     
   { for(let x = 0; x < 3; x++){

    let posX = ((i-(3*Math.floor(i/3)))*3)+x
    let posY = (Math.floor(i/3)*3)+y
        
    let testTile = iTiles[iTiles.findIndex(el => {return el.gridPosition.x == posX && el.gridPosition.y == posY })]
    if (testTile == undefined) {
      boxes[i].valid = false
      break
      } else {
      boxes[i].valid = true
    }
    }
    if (boxes[i].valid==false){break}
    }

    validClears = 0

    //highlight valid rows/cols/boxes
    rows.forEach(row => {if(row.valid==true){validClears+=1; for(let x = 0; x < gridSize; x++){iTiles[iTiles.findIndex(el => {return el.gridPosition.x == x && el.gridPosition.y == row.id})].isHighlighting = true; }}})
    cols.forEach(col => {if(col.valid==true){validClears+=1; for(let y = 0; y < gridSize; y++){iTiles[iTiles.findIndex(el => {return el.gridPosition.x == col.id && el.gridPosition.y == y})].isHighlighting = true; }}})
    boxes.forEach(box => {if(box.valid==true){
      validClears+=1

      for (let y = 0; y < 3; y++)     
      { for(let x = 0; x < 3; x++){ 

        let posX = ((box.id-(3*Math.floor(box.id/3)))*3)+x
        let posY = (Math.floor(box.id/3)*3)+y

        iTiles[iTiles.findIndex(el => {return el.gridPosition.x == posX && el.gridPosition.y == posY})].isHighlighting = true

      }


    }


    }})



 
    //highlight squares on piece
let currentPiece
stash.some(piece => {if(piece.mousePressed == true){currentPiece = piece; return true}})
for (let i = 0; i < currentHoveringTiles.length; i++) {
  if (currentHoveringTiles[i].isHighlighting==true) {currentPiece.squares[i].isHighlighting = true}
}

  }
}

  function detectValidPlacement() {

    curHoverX = newHoverX
    curHoverY = newHoverY

    resetHighlightingPieceSquares();

  //valid placement detection
  clearTileHoverEffect();

    let shiftX = 0
    let shiftY = 0

    let invalid = false



let minSquare = objPressed.squares.reduce((min, square) => min.position.x < square.position.x || min.position.y < square.position.y ? min : game)

let InterTiles = getIntersectingValidTiles(minSquare);

//if no intersecting tiles
if (InterTiles.length == 0) {clearTileHoverEffect();  return true;}
//if off screen
if (minSquare.position.x <= 0 - (tileSize/2) + centerOffsetX || minSquare.position.y <= 0 - (tileSize/2) || minSquare.position.x >= (tileSize * gridSize) - (tileSize/2) + centerOffsetX  || minSquare.position.y >= (tileSize * gridSize) - (tileSize/2)) {clearTileHoverEffect();  return true;}
let minTile = InterTiles.reduce((min, iTile) => min.position.x < iTile.position.x || min.position.y < iTile.position.y || iTile.inUse == false ? min : game)

if ((minSquare.position.x / tileSize) >= ((minTile.position.x + (tileSize / 2)) / tileSize) && (minSquare.position.y / tileSize) >= ((minTile.position.y + (tileSize / 2)) / tileSize)) {shiftX = 1; shiftY = 1;}
if ((minSquare.position.x / tileSize) >= ((minTile.position.x + (tileSize / 2)) / tileSize)) {shiftX = 1}
if ((minSquare.position.y / tileSize) >= ((minTile.position.y + (tileSize / 2)) / tileSize)) {shiftY = 1}

minTile = InterTiles.find(iTile => {return iTile.gridPosition.x == minTile.gridPosition.x + shiftX && iTile.gridPosition.y == minTile.gridPosition.y + shiftY})

if (minTile == null) {return}

if (minTile.inUse == true) {return}

minTile.isHovering = true
currentHoveringTiles.push(minTile)


newHoverX = minTile.gridPosition.x
newHoverY = minTile.gridPosition.y
// tile.colorAlpha = 0
// tile.hColor = 'rgba(255,255,255,' + tile.colorAlpha + ')'

//map rest of squares

objPressed.squares.some(square => {if(square !== minSquare){

let nTile = tiles.find(tile => {return tile.gridPosition.x == minTile.gridPosition.x + (square.x - minSquare.x) && tile.gridPosition.y == minTile.gridPosition.y + (square.y - minSquare.y)})

if (nTile == null) {return true}

if (nTile.inUse == true) {clearTileHoverEffect(); invalid = true; return true;} else {nTile.isHovering = true; currentHoveringTiles.push(nTile)}

}})

if (invalid == true) {clearTileHoverEffect(); return}



let hoveringTiles = getCurrentHoveringTiles()

if (hoveringTiles.length !== objPressed.squares.length) {clearTileHoverEffect(); return true;}

detectClearTiles()

 

  }

  
  function resetHighlightingPieceSquares() {
  //reset highlighted squares
    stash.forEach(piece => {piece.squares.forEach(square => {square.isHighlighting = false})})
  }

  function clearTileHoverEffect(){
    tiles.forEach(tile => {tile.isHovering = false;
                          tile.isHighlighting = false;
                          currentHoveringTiles = [];})
    
  }

  function getIntersectingValidTiles(sqr) {

    let intersectingTiles = [];

    tiles.some(tile => {if(objWithinObj(sqr,tile)) {intersectingTiles.push(tile)} })

    return intersectingTiles

  }

  function getCurrentHoveringTiles() {
    let hoveringTiles = [];
    tiles.forEach(tile => {if(tile.isHovering == true){hoveringTiles.push(tile)}})
    return hoveringTiles
  }


  function setSizing() {

    const CANVAS =  document.querySelector("#gameWindow")
    const CONTEXT = document.querySelector("#gameWindow").getContext("2d")
    const CONTAINER = document.querySelector("#gameContainer")

    let size = (innerWidth < innerHeight) ? innerWidth : innerHeight

    tileSize = (size/(gridSize+(ratio+6)));


    let heightMod = tileSize * (ratio+6);

    let gridSizePx = tileSize * (gridSize)

   CANVAS.style.width = innerWidth + 'px';
   CANVAS.style.height = gridSizePx + heightMod + 'px';

   CANVAS.width = innerWidth * ratio;
   CANVAS.height = (gridSizePx+heightMod) * ratio;


    

    CONTEXT.scale(ratio,ratio)
    //document.querySelector('#contentContainer').style.gridTemplateRows = '1fr 3vw min(12vw,12vh) ' + ((tileSize*(gridSize+4)) * ratio) + 'px';
    // document.querySelector("#gameWindow").height = (tileSize*(gridSize+4)) * ratio;
    // document.querySelector("#gameWindow").width = (tileSize*gridSize) * ratio;
    // document.querySelector("#gameWindow").style.zoom = 1;

    centerOffsetX = (innerWidth / 2) - (tileSize * (gridSize/2))

    //document.querySelector('#contentContainer').style.width = (tileSize*gridSize) + 'px';

  }

function generateTiles() {
  
    

    tiles = [];

  //generate tiles
  for(let x = 0; x < gridSize; x++) {

    for(let y = 0; y < gridSize; y++) {
      let tile = new Tile({x:centerOffsetX+(x*(tileSize)),y:y*tileSize},{x:x,y:y},{w:tileSize,h:tileSize})
      tile.color = (isAltTileColour(tile)) ? tileColor : tileAltColor
      tiles.push(tile)
      
    }

  }
}

function fillStash() {


stash = []



for(let i = 0; i < 3; i++) {
let p
let duplicate = false
do {

duplicate = false

p = new GamePiece(Math.floor(Math.random()*Pieces.length),i)

  if (p.type == "BL_DR") {}

  //check stash for duplicates
  stash.some(piece => {if(p.type == piece.type) {duplicate = true; return true;}})

}
while (duplicate == true)

stash.push(p)


}



checkPiecesForAvailablePlacements();


}

function getBestScoreCookie() {
    let score
if (localStorage.getItem('bestScore') == null) {
    score = getCookie("bestScore");
    localStorage.setItem('bestScore',score)
  } else {score = localStorage.getItem('bestScore');}
    if (score != "") {
     bestScore = score
     document.querySelector("#bestScore").innerHTML = bestScore
    } else {
        //setCookie("bestScore", 0, 365);
        localStorage.setItem('bestScore',0)
    }
  }

  function getVersionCookie() {
    let version = getCookie("version");
     document.querySelector("#version").innerHTML = version
  }

  function getVersion() {
    let version = localStorage.getItem("version");
    document.querySelector("#version").innerHTML = version
  }

  function getOptions() {
    //darkmode
    if (darkmode == "enabled") {document.body.classList.add("darkmode"); document.querySelector("#darkmodeoption").checked = true;} else {document.body.classList.remove("darkmode"); document.querySelector("#darkmodeoption").checked = false}
    tileColor = getComputedStyle(document.body).getPropertyValue('--tileColor');
    tileAltColor = getComputedStyle(document.body).getPropertyValue('--tileAltColor');
    bgColor = getComputedStyle(document.body).getPropertyValue('--bgColor');
    bgAltColor = getComputedStyle(document.body).getPropertyValue('--bgAltColor');
    btnColor = getComputedStyle(document.body).getPropertyValue('--btnColor');
    btnDisabledColor = getComputedStyle(document.body).getPropertyValue('--btnDisabledColor');
    btnAltColor = getComputedStyle(document.body).getPropertyValue('--btnAltColor');
    txtColor = getComputedStyle(document.body).getPropertyValue('--txtColor');
    txtAltColor = getComputedStyle(document.body).getPropertyValue('--txtAltColor'); 
    highlightColor = getComputedStyle(document.body).getPropertyValue('--highlightColor');
    document.getElementsByTagName('meta')["theme-color"].content = getComputedStyle(document.body).getPropertyValue('--bgColor')
  
  }

  function toggleOption(option) {
    let currentstate = document.querySelector("#" + option + "option").checked
    localStorage.setItem(option,(currentstate == true) ? "enabled" : null)
    darkmode = (currentstate == true) ? "enabled" : null
    getOptions();
    saveProgress();
    loadProgress();
    gameLoopStop = 1;
    startGameLoop(60);
  }

  function playComboSound(combo) {
  if (combo !== 1) {
    let comboAudio = new Audio("/audio/combo" + combo + ".mp3")

    //comboAudio.play()
  }
  }

  function addToScore(amount) {
    let oldScore = currentScore
    currentScore += amount;

for (let i = 0; i < amount; i++) {
  setTimeout(function() { document.querySelector("#score").innerHTML = oldScore + (i + 1)},i * 50)
}

    
  }

  function setScore(value) {
    currentScore = value
    document.querySelector("#score").innerHTML = currentScore
  }

  function checkProgress() {
    if(localStorage.getItem("progressTiles") === null || localStorage.getItem("progressTiles") == "") {load()} else {
      openModal("gameInProgressModal")
    }
  }

  function clearProgress() {
    localStorage.setItem("progressTiles", "")
    localStorage.setItem("progressStash", "")
    localStorage.setItem("progressStats", "")
  }

function saveProgress() {

    tiles.forEach(tile => {delete tile._gsap;})

localStorage.setItem("progressTiles",JSON.stringify(tiles))
localStorage.setItem("progressStash", JSON.stringify(stash))
localStorage.setItem("progressStats", JSON.stringify({score: currentScore, combo: currentCombo}))

  }

  function loadProgress() {

    tiles = [];
    stash = [];

    tilesNew = JSON.parse(localStorage.getItem("progressTiles"))
    stashNew = JSON.parse(localStorage.getItem("progressStash"))
    statsNew = JSON.parse(localStorage.getItem("progressStats"))

    generateTiles()

//iterate through tiles and apply values to properties from saveState minus colour properties
let i = 0
tiles.forEach(tile => {
  for (const prop in tile) {
    if(prop.toLocaleLowerCase().indexOf('color') < 0) {
      tiles[i][prop] = tilesNew[i][prop]
    }
  }
i++
})



//iterate through stash and apply values to properties from saveState minus colour properties

fillStash()

if (stashNew.length == 2) {stash.pop();} else if (stashNew.length == 1) {stash.pop();stash.pop();}

i = 0
stash.forEach(piece => {
  stashNew[i].no = i
  for (const prop in piece) {
    if(prop.toLocaleLowerCase().indexOf('color') < 0) {
      stash[i][prop] = stashNew[i][prop]
    }
  }
i++ 
})




//Stats

setScore(statsNew.score)
currentCombo = statsNew.combo
document.querySelector("#currentCombo").innerHTML = currentCombo + 'X';


}


//FIREBASE

function addServer() {
  playerServerId = Date.now()
  playerServer = firebase.database().ref(`servers/${playerId}`);

        playerServer.set({
          id: playerId,
          name: document.querySelector('input[name=sname]').value,
          gamemode: document.querySelector('input[name=radioMode]:checked').value,
          playerIds: [playerId],
          gameOptions: document.querySelector('input[name=radioGO]:checked').value

        })

        //set players server
        players[playerId].server = playerId
        playerRef.set(players[playerId])


        //removes server on disconnect
        playerServer.onDisconnect().remove();
}




  

const channel4Broadcast = new BroadcastChannel('channel4');

channel4Broadcast.onmessage = (event) => {
  let value = event.data;
  //setCookie('version',value,365)
  localStorage.setItem('version',value)
}


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


let mouseX = null;
let mouseY = null;

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

//===============================================

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

//=================================


  
function load() {
  //make menu invisible
  closeModal('mainMenuModal')

  //reset score 
  setScore(0)

  //reset tiles
  board.tiles = [];

  //set app sizing
  setSizing();
  //gen tiles
  board.generateTiles();
  //cap to 60FPS
  startGameLoop(60);
  //get best score
  getBestScoreCookie();

  if (localStorage.getItem("progressTiles") === null) {
    localStorage.setItem("progressTiles","")
    localStorage.setItem("progressStash","")
    localStorage.setItem("progressStats","")
    stash.fill()
  }

  if (localStorage.getItem("progressTiles") !== "") {
    loadProgress();
  } else {stash.fill()}

  }


  function startGameLoop(fps) {
    //fpsInterval = 1000 / fps;
    //then = Date.now();
    //startTime = then;
  
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

   //now = Date.now();
   //elapsed = now - then;

   // if enough time has elapsed, draw the next frame

   //if (elapsed > fpsInterval) {

       // Get ready for next frame by setting then=now, but...
       // Also, adjust for fpsInterval not being multiple of 16.67
       //then = now - (elapsed % fpsInterval);
    

  //clear canvas
  c.clearRect(0,0,document.querySelector('#gameWindow').width,document.querySelector('#gameWindow').height)

  //start tile hover animation
  if (board.newHoverX !== board.curHoverX || board.newHoverY !== board.curHoverY) {
  tl = gsap.timeline()
    board.tiles.forEach(tile => {tile.colorAlpha = 0; if(tile.isHovering){tl.to(tile,{colorAlpha:1, duration:2, overwrite:true},"tile")}})
  }

  //update tiles
  board.updateTiles()


  //draw missing line edges
  c.strokeStyle = 'black'
  c.lineWidth = 1
  c.beginPath()
  c.moveTo(((gridSize) * tileSize) + centerOffsetX,0)
  c.lineTo(((gridSize) * tileSize) + centerOffsetX,((gridSize) * tileSize))
  c.moveTo(((gridSize) * tileSize) + centerOffsetX,((gridSize) * tileSize))
  c.lineTo(0 + centerOffsetX,((gridSize) * tileSize))
  c.stroke()

  //update gamepieces in stash
  stash.updateAll()



  //update various parts of board if current piece has valid placement
  if (objPressed !== null) {
    board.detectValidPlacement()
  }


}



  function setSizing() {

    const CANVAS =  document.querySelector("#gameWindow")
    const CONTEXT = document.querySelector("#gameWindow").getContext("2d")
    const CONTAINER = document.querySelector("#gameContainer")

    let size = (innerWidth < innerHeight) ? innerWidth : innerHeight

    let screenRatio = Math.ceil(innerHeight/innerWidth) 
    let tileSizeMod = (screenRatio > 2) ? 1 : screenRatio+7

    tileSize = (size/(gridSize+(tileSizeMod)));


    let heightMod = tileSize * 4;

    let gridSizePx = tileSize * (gridSize)

   CANVAS.style.width = innerWidth + 'px';
   console.log(innerWidth)
   CANVAS.style.height = gridSizePx + heightMod + 'px';

   CANVAS.width = innerWidth * ratio;
   console.log(innerWidth * ratio)
   CANVAS.height = (gridSizePx+heightMod) * ratio;


    

    CONTEXT.scale(ratio,ratio)
    //document.querySelector('#contentContainer').style.gridTemplateRows = '1fr 3vw min(12vw,12vh) ' + ((tileSize*(gridSize+4)) * ratio) + 'px';
    // document.querySelector("#gameWindow").height = (tileSize*(gridSize+4)) * ratio;
    // document.querySelector("#gameWindow").width = (tileSize*gridSize) * ratio;
    // document.querySelector("#gameWindow").style.zoom = 1;

    //centerOffsetX = 0
    centerOffsetX = (innerWidth / 2) - (tileSize * (gridSize/2))

    //document.querySelector('#contentContainer').style.width = (tileSize*gridSize) + 'px';

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
    //if(localStorage.getItem("progressTiles") === null || localStorage.getItem("progressTiles") == "") {load()} else {
      openModal("gameInProgressModal")
    //
  }

  function clearProgress() {
    localStorage.setItem("progressTiles", "")
    localStorage.setItem("progressStash", "")
    localStorage.setItem("progressStats", "")
  }

function saveProgress() {

    board.tiles.forEach(tile => {delete tile._gsap;})

localStorage.setItem("progressTiles",JSON.stringify(board.tiles))
localStorage.setItem("progressStash", JSON.stringify(stash.GamePieces))
localStorage.setItem("progressStats", JSON.stringify({score: currentScore, combo: currentCombo}))

  }

  function loadProgress() {

    stash.GamePieces = [];

    //get load data
    tilesNew = JSON.parse(localStorage.getItem("progressTiles"))
    stashNew = JSON.parse(localStorage.getItem("progressStash"))
    statsNew = JSON.parse(localStorage.getItem("progressStats"))

    //generate tiles
    board.generateTiles()

    //iterate through tiles and apply values to properties from saveState minus colour properties
    let i = 0
    board.tiles.forEach(tile => {
      for (const prop in tile) {
        if(prop.toLocaleLowerCase().indexOf('color') < 0) {
          board.tiles[i][prop] = tilesNew[i][prop]
        }
      }
    i++
    })

    //iterate through stash and apply values to properties from saveState minus colour properties
    stash.fill()

    //remove elements so new stash (loaded stash) equals stash
    if (stashNew.length == 2) {stash.GamePieces.pop();} else if (stashNew.length == 1) {stash.GamePieces.pop();stash.GamePieces.pop();}


    i = 0
    stash.GamePieces.forEach(piece => {
      stashNew[i].no = i
        for (const prop in piece) {
          if(prop.toLocaleLowerCase().indexOf('color') < 0) {
          stash.GamePieces[i][prop] = stashNew[i][prop]
          }
        }
      i++ 
    })




//Stats

setScore(statsNew.score)
currentCombo = statsNew.combo
document.querySelector("#currentCombo").innerHTML = currentCombo + 'X';


}


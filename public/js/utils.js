function ObjToStr(obj) {
    let objStr = JSON.stringify(obj)
    return objStr
  }

function objWithinObj(obj1,obj2) {
  
    let obj1left = obj1.position.x
    let obj1top = obj1.position.y
    let obj1right = obj1.position.x + obj1.size.w
    let obj1bottom = obj1.position.y + obj1.size.h

    let obj2left = obj2.position.x
    let obj2top = obj2.position.y
    let obj2right = obj2.position.x + obj2.size.w
    let obj2bottom = obj2.position.y + obj2.size.h

    var intersected = true;
    if ((obj1bottom < obj2top) ||
    (obj1top > obj2bottom) ||
    (obj1right < obj2left ) ||
    (obj1left > obj2right)) {
      intersected = false;
    }
    return intersected;
}

  
function mouseOnObj(mouseX, mouseY, obj) {
    if (mouseX >= (obj.position.x) && mouseX <= ((obj.position.x) + obj.size.w) && mouseY >= (obj.position.y) && mouseY <= ((obj.position.y) + obj.size.h)) {
      return true
    }
      return false
}

function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

function openModal(modal){
    document.getElementById(modal).style.display = "block"
}
  
function closeModal(modal){
document.getElementById(modal).style.display = "none"
}

function isAltTileColour(tile) {

switch (JSON.stringify(tile.gridPosition)) {

    case ObjToStr({x:0,y:0}) :
    case ObjToStr({x:1,y:0}) :
    case ObjToStr({x:2,y:0}) :
    case ObjToStr({x:0,y:1}) :
    case ObjToStr({x:1,y:1}) :
    case ObjToStr({x:2,y:1}) :
    case ObjToStr({x:0,y:2}) :
    case ObjToStr({x:1,y:2}) :
    case ObjToStr({x:2,y:2}) :

    case ObjToStr({x:0,y:6}) :
    case ObjToStr({x:1,y:6}) :
    case ObjToStr({x:2,y:6}) :
    case ObjToStr({x:0,y:7}) :
    case ObjToStr({x:1,y:7}) :
    case ObjToStr({x:2,y:7}) :
    case ObjToStr({x:0,y:8}) :
    case ObjToStr({x:1,y:8}) :
    case ObjToStr({x:2,y:8}) :

    case ObjToStr({x:6,y:0}) :
    case ObjToStr({x:7,y:0}) :
    case ObjToStr({x:8,y:0}) :
    case ObjToStr({x:6,y:1}) :
    case ObjToStr({x:7,y:1}) :
    case ObjToStr({x:8,y:1}) :
    case ObjToStr({x:6,y:2}) :
    case ObjToStr({x:7,y:2}) :
    case ObjToStr({x:8,y:2}) :

    case ObjToStr({x:6,y:6}) :
    case ObjToStr({x:7,y:6}) :
    case ObjToStr({x:8,y:6}) :
    case ObjToStr({x:6,y:7}) :
    case ObjToStr({x:7,y:7}) :
    case ObjToStr({x:8,y:7}) :
    case ObjToStr({x:6,y:8}) :
    case ObjToStr({x:7,y:8}) :
    case ObjToStr({x:8,y:8}) :

    case ObjToStr({x:3,y:3}) :
    case ObjToStr({x:4,y:3}) :
    case ObjToStr({x:5,y:3}) :
    case ObjToStr({x:3,y:4}) :
    case ObjToStr({x:4,y:4}) :
    case ObjToStr({x:5,y:4}) :
    case ObjToStr({x:3,y:5}) :
    case ObjToStr({x:4,y:5}) :
    case ObjToStr({x:5,y:5}) :

    return true

}


    return false

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
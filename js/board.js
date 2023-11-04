var board = {
 tiles : [],

generateTiles() {
  
    

    this.tiles = [];

  //generate tiles
  for(let x = 0; x < gridSize; x++) {

    for(let y = 0; y < gridSize; y++) {
      let tile = new Tile({x:centerOffsetX+(x*(tileSize)),y:y*tileSize},{x:x,y:y},{w:tileSize,h:tileSize})
      tile.color = (isAltTileColour(tile)) ? tileColor : tileAltColor
      this.tiles.push(tile)
      
    }

  }
},

detectClearTiles() {
    

    let rows = [];
    for (let x = 0; x < gridSize; x++) {rows.push({id: x,valid: false})}
    let cols = [];
    for (let y = 0; y < gridSize; y++) {cols.push({id: y,valid: false})}
    let boxes = [];
    for (let i = 0; i < Math.pow(gridSize/3,2); i++) {boxes.push({id: i,valid:false})}




//get all inuse and hovering tiles
let iTiles = [];
this.tiles.forEach(tile => {if(tile.inUse == true || tile.isHovering == true){iTiles.push(tile)}})
    
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


    stash.highlightCurrentPiece()
 


  }
},

 getCurrentHoveringTiles() {
    let hoveringTiles = [];
    this.tiles.forEach(tile => {if(tile.isHovering == true){hoveringTiles.push(tile)}})
    return hoveringTiles
},

clearTileHoverEffect(){
    this.tiles.forEach(tile => {tile.isHovering = false;
                          tile.isHighlighting = false;
                          currentHoveringTiles = [];})
    
},


getIntersectingValidTiles(sqr) {

    let intersectingTiles = [];

    this.tiles.some(tile => {if(objWithinObj(sqr,tile)) {intersectingTiles.push(tile)} })

    return intersectingTiles

  }

}
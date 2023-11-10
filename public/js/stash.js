var stash = {
  
  GamePieces: [],
  
  fill() {

    GamePieces = []
        
        for(let i = 0; i < 3; i++) {
          
          let p

          let duplicate = false

            do {
            
              duplicate = false
              
              p = new GamePiece(Math.floor(Math.random()*Pieces.length),i)
              
                if (p.type == "BL_DR") {}
              
                //check stash for duplicates
                stash.GamePieces.some(piece => {if(p.type == piece.type) {duplicate = true; return true;}})
            
            } while (duplicate == true)
        
        
            stash.GamePieces.push(p)
        
          }

          this.checkForAvailablePlacements()

        },

  updateAll() {
    stash.GamePieces.forEach(gamepiece => {gamepiece.update()})
  },

  checkForAvailablePlacements() {
    
    this.GamePieces.forEach(piece => {
      piece.canBePlaced = false
      for (let y = 0; y < gridSize; y++) {

        for (let x = 0; x < gridSize; x++) {

          let validSquares = 0
          piece.squares.forEach(square => {
            
            let testTile = board.tiles[board.tiles.findIndex(el => {return el.gridPosition.x == square.x + x && el.gridPosition.y == square.y + y })]
            
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
  },

  highlightCurrentPiece() {
        //highlight squares on piece
        let currentPiece
        stash.GamePieces.some(piece => {if(piece.mousePressed == true){currentPiece = piece; return true}})
        for (let i = 0; i < currentHoveringTiles.length; i++) {
          if (currentHoveringTiles[i].isHighlighting==true) {currentPiece.squares[i].isHighlighting = true}
        }
  },

  resetHighlightingPieceSquares() {
    //reset highlighted squares
      stash.GamePieces.forEach(piece => {piece.squares.forEach(square => {square.isHighlighting = false})})
    }


}    
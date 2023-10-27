const Pieces = [
'1',
'2_H',
'2_V',
'3_H',
'3_V',
'4_H',
'4_V',
'5_H',
'5_V',
'SL_UL',
'SL_UR',
'SL_DL',
'SL_DR',
'BL_UL',
'BL_UR',
'BL_DL',
'BL_DR',
'SD_L',
'SD_R',
'MD_L',
'MD_R',
'LD_L',
'LD_R',
'C',
'2_2',
'U_L',
'U_R',
'U_D',
'U_U',
'ST_U',
'ST_L',
'ST_R',
'ST_D',
'LT_U',
'LT_L',
'LT_R',
'LT_D',
'Z_VL',
'Z_VR',
'Z_HU',
'Z_HD'
]

// const Pieces = [
//     'BL_UL',
//     'BL_UR',
//     'BL_DL',
//     'BL_DR'
//     ]

class GamePiece {

   
    constructor(id,no) {
        this.no = no,
        this.id = id,
        this.type = this.getType(this.id),
        this.squares = this.loadSquares(),
        this.color = btnColor,
        this.pColor = highlightColor,
        this.xColor = btnDisabledColor,
        this.isHighlighting = false
        this.xMax = Math.max.apply(Math, this.squares.map(function(o) { return o.x+1; }));
        this.yMax = Math.max.apply(Math, this.squares.map(function(o) { return o.y+1; }));
        this.posModX = (this.no==0) ? ((tileSize*1.5)-((this.xMax/2)*(tileSize/2))) : (this.no==1) ? ((tileSize*4.5)-((this.xMax/2)*(tileSize/2))) : (this.no==2) ? ((tileSize*7.5)-((this.xMax/2)*(tileSize/2))) : 1*tileSize
        this.mousePressed = false
        this.position = {x:0,y:0}
        this.size = {w:0,h:0}
        this.canBePlaced = true
    }



    getType(i) {
        return Pieces[i]
    }

    loadSquares() {
        switch (this.type) {
            case '1':
                return [{x:0,y:0,isHighlighting:false}]
            case '2_H':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false}]
            case '2_V':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false}]
            case '3_H':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false}]
            case '3_V':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false}]
            case '4_H':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:3,y:0,isHighlighting:false}]
            case '4_V':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:0,y:3,isHighlighting:false}]
            case '5_H':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:3,y:0,isHighlighting:false},{x:4,y:0,isHighlighting:false}]
            case '5_V':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:0,y:3,isHighlighting:false},{x:0,y:4,isHighlighting:false}]
            case 'SL_UL':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:0,isHighlighting:false}]
            case 'SL_UR':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case 'SL_DL':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case 'SL_DR':
                return [{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:0,y:1,isHighlighting:false}]
            case 'BL_UL':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:2,y:0,isHighlighting:false}]
            case 'BL_UR':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false}]
            case 'BL_DL':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:2,y:2,isHighlighting:false}]
            case 'BL_DR':
                return [{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:1,y:2,isHighlighting:false}]
            case 'SD_L':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case 'SD_R':
                return [{x:2,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case 'MD_L':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false}]
            case 'MD_R':
                return [{x:2,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false}]
            case 'LD_L':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false},{x:3,y:3,isHighlighting:false}]
            case 'LD_R':
                return [{x:3,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:0,y:3,isHighlighting:false}]
            case 'C':
                return [{x:1,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case '2_2':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false}]
            case 'U_L':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:1,y:2,isHighlighting:false}]
            case 'U_R':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:0,y:2,isHighlighting:false}]
            case 'U_U':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false}]
            case 'U_D':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:0,isHighlighting:false}] 
            case 'ST_U':
                return [{x:0,y:1,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:0,isHighlighting:false}] 
            case 'ST_L':
                return [{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:0,y:1,isHighlighting:false}] 
            case 'ST_R':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:1,y:1,isHighlighting:false}] 
            case 'ST_D':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false}] 
            case'LT_U':
                return [{x:0,y:2,isHighlighting:false},{x:1,y:2,isHighlighting:false},{x:2,y:2,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:0,isHighlighting:false}] 
            case 'LT_L':
                return [{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:0,y:1,isHighlighting:false}] 
            case 'LT_R':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:1,isHighlighting:false}] 
            case 'LT_D':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false},{x:2,y:1,isHighlighting:false},{x:2,y:2,isHighlighting:false}]     
            case 'Z_VL':
                return [{x:0,y:0,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:1,y:2,isHighlighting:false}]    
            case 'Z_VR':
                return [{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:0,y:1,isHighlighting:false},{x:0,y:2,isHighlighting:false}] 
            case 'Z_HU':
                return [{x:0,y:0,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:2,y:1,isHighlighting:false}] 
             case 'Z_HD':
                return [{x:0,y:1,isHighlighting:false},{x:1,y:1,isHighlighting:false},{x:1,y:0,isHighlighting:false},{x:2,y:0,isHighlighting:false}] 
        } 

    }

    update() {let StashY = gridSize+1
            if(this.mousePressed==true && this.canBePlaced == true) {
           
               let maxX = Math.max.apply(Math,this.squares.map(function(o){return o.x}))
                this.squares.forEach(square => {
         
                    square.position = {}
                    square.size = {}
                    square.position.x = mouseX+(tileSize*square.x)-((tileSize*(maxX+1))/2)
                    square.position.y = (touchsupported()) ?  mouseY+((tileSize*square.y)-(tileSize*(2+this.yMax))) : mouseY+((tileSize*square.y)-((this.yMax*tileSize)/2)) 
            
                    square.size.x = tileSize
                    square.size.y = tileSize
                    }) 
        
        
            } else  {
                this.squares.forEach(square => {
         
                square.position = {}
                square.size = {}
                square.position.x = (tileSize/2)*(+square.x)+this.posModX
                square.position.y = (tileSize/2)*(+square.y+(StashY*2))-(tileSize/2)
                square.size.x = tileSize/2
                square.size.y = tileSize/2
                }) 
        
        
            this.position.x = this.posModX
            this.position.y = ((tileSize/2)*(StashY*2))-(tileSize/2)
            this.size.w = (tileSize/2)*5
            this.size.h = (tileSize/2)*5
        
            }
        
            this.draw()
        }

        

draw() {

   
c.fillStyle = (this.canBePlaced == false) ? this.xColor : (this.isHighlighting == true) ? this.pColor : this.color
c.strokeStyle = (this.canBePlaced == false) ? 'grey' : 'black'
this.squares.forEach(square => {if(square.isHighlighting==true){c.fillStyle=this.pColor} else {c.fillStyle=this.color}; c.fillRect(square.position.x,square.position.y,square.size.x,square.size.y);c.strokeRect(square.position.x,square.position.y,square.size.x,square.size.y)})


}


    
}

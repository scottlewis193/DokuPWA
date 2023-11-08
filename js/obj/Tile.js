class Tile {
    constructor(position,gridPosition,size) {
    this.position = {x: position.x, y: position.y}
    this.gridPosition = {x: gridPosition.x, y: gridPosition.y}
    this.size = {w: size.w, h: size.h}
    this.color = null
    this.colorAlpha = 0
    this.inUse = false
    this.isHovering = false
    this.isHighlighting = false
    this.inUseColor = btnColor
    this.hColor = 'rgba(0,0,0,' + this.colorAlpha + ')'
    this.pColor = addAlpha(highlightColor,1)
    }
    update() {
 
        this.hColor = this.hColor.replace(/[^,]+(?=\))/,this.colorAlpha)
        this.draw()
    }
draw() {
 
    c.fillStyle = (this.isHighlighting==true) ? this.pColor : (this.inUse==true) ? this.inUseColor : this.color ;
    c.fillRect(this.position.x,this.position.y,this.size.w,this.size.h)

    if(this.isHovering == true && this.isHighlighting == false) {
    c.fillStyle = this.hColor
    c.fillRect(this.position.x,this.position.y,this.size.w,this.size.h)
    }
    // c.font = '12px verdana'
    // c.fillText('x:' + Math.floor(this.position.x),this.position.x,this.position.y+15)
    // c.fillText('y:' + Math.floor(this.position.y),this.position.x,this.position.y +25)
    c.strokeStyle = 'black'
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(this.position.x+1,this.position.y)
    c.lineTo(this.position.x+1+this.size.w,this.position.y)
    c.moveTo(this.position.x+1,this.position.y)
    c.lineTo(this.position.x+1,this.position.y+this.size.h)
    c.stroke()
    if(this.isHovering == true && this.isHighlighting == false) {
    c.fillStyle = this.hColor
    c.fillRect(this.position.x,this.position.y,this.size.w,this.size.h)
    }

}


}

    

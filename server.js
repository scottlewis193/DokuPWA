//express setup
const express = require('express')
const app = express()
const port = 8080

//socket io setup
const http = require('http');
const { get } = require('https');
const server = http.createServer(app);
const { Server } = require('socket.io');


const io = new Server(server, {pingInterval: 2000,pingTimeout: 10000})

//set static folder
app.use(express.static('public'))

//serve index page to client
app.get('/', (req,res) => {
   res.sendFile(__dirname= 'index.html')
})


//socket io connection event listener
io.on('connection', (socket) => {
console.log(`${socket.id} Connected`)

  socket.on('disconnect', (reason) => { 
    console.log(`${socket.id} Disconnected: ${reason}`)
  })


 })

 //server listen event listener
server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})




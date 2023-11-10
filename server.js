//express setup
const express = require('express')
const app = express()
const port = 8080

//socket io setup
const http = require('http');
const { get } = require('https');
const server = http.createServer(app);
const { Server } = require('socket.io');

//sqlite setup
const sqlite3 = require('sqlite3').verbose();

//debug memory db

var db;
new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
  console.log('Db')
   // if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
     //   return;
       // } else if (err) {
         //   console.log("Getting error " + err);
           // exit(1);
    //}
    //runQueries(db);
});

function createDatabase() {
  console.log('Create Db')
  var newdb = new sqlite3.Database(':memory:', (err) => {
      if (err) {
          console.log("Getting error " + err);
          exit(1);
      }
      createTables(newdb);
  });
}

function createTables(newdb) {
  newdb.exec(
  `CREATE TABLE "users" (
  "id" INTEGER NOT NULL UNIQUE,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
  );`)

  console.log('Table Created')
}

function runQueries(db) {
  // db.all(`
  // select , is_xman, was_snapped from hero h
  // inner join hero_power hp on h.hero_id = hp.hero_id
  // where hero_power = ?`, "Total Nerd", (err, rows) => {
  //     rows.forEach(row => {
  //         console.log(row.hero_name + "\t" +
  //         row.is_xman + "\t" +
  //         row.was_snapped);
  //     });
  // });
}

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


// Credits : https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
// (A) REQUIRE CRYPTO LIBRARY
var crypto = require("crypto");

// (B) CREATE PASSWORD HASH
var creepy = clear => {
  // (B1) GENERATE RANDOM SALT
  let length = 16;
  let salt =  crypto.randomBytes(Math.ceil(length / 2))
  .toString("hex")
  .slice(0, length); 

  // (B2) SHA512 HASH
  let hash = crypto.createHmac("sha512", salt);
  hash.update(clear);
  return {
    salt: salt,
    hash: hash.digest("hex")
  };
};

// (C) TEST ENCRYPT
// Save BOTH the password and salt into database or file
var clearpass = "He110Wor!d";
var creeped = creepy(clearpass);
console.log("===== HASHED PASSWORD + SALT =====");
console.log(creeped);

// (D) VALIDATE PASSWORD
var validate = (userpass, hashedpass, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(userpass);
  userpass = hash.digest("hex");
  return userpass == hashedpass;
};

// (E) TEST VALIDATE
// clearpass = "FOOBAR";
var validated = validate(clearpass, creeped.hash, creeped.salt);
console.log("===== VALIDATION =====");
console.log("Clear password: " + clearpass);
console.log("Validation status: " + validated);

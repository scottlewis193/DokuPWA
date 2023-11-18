
//sqlite setup
const sqlite3 = require('sqlite3').verbose();

//crypto
const crypto = require('./crypto');

//debug memory db

dbStartup();

function dbStartup() {

  // open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE users(id INTEGER NOT NULL UNIQUE,username TEXT NOT NULL UNIQUE,password TEXT NOT NULL, PRIMARY KEY(id AUTOINCREMENT))',function(err) {
    if (err) return console.log(err.message)
  })
    .run(`INSERT INTO users(username,password)
          VALUES('Scott1'),
                ('Scott2'),
                ('Scott3')`)
    .run(`CREATE TABLE salt(id INTEGER NOT NULL UNIQUE,salt TEXT NOT NULL, PRIMARY KEY(id, AUTOINCREMENT))`)
    //.each(`SELECT username FROM users`, (err, row) => {
      //if (err){
        //throw err;
      //}
      //console.log(row.username);
    //});
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});


}

function insertSalt(salt) {
     db.run(`INSERT INTO salt(salt) VALUES(${salt})`)
}

function getSalt() {
    db.each(`SELECT salt FROM salt`, (err, row) => {
        if (err){
          throw err;
        }
        return row.salt;
      });
}

function getPassword(username) {
    db.each(`SELECT password FROM users WHERE username = ?`,[username], (err, row) => {
        if (err){
          throw err;
        }
        return row.password;
      });
}

function updatePassword(username,password) {
    password = crypto.encryptPassword(password)
    db.run(`UPDATE users SET password = ? WHERE username = ?`,[password, username], (err) => {
        if (err) {
            throw err;
        }
    })
}

module.exports = {getSalt,insertSalt,getPassword,updatePassword}
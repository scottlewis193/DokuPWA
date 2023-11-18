// // Credits : https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
// // (A) REQUIRE CRYPTO LIBRARY
var crypto = require("crypto");
var storage = require("./storage")

// (B) CREATE PASSWORD HASH
var creepy = clear => {
  
  //CHECK IF SALT EXISTS
  let salt = storage.getSalt() 
  if (salt == undefined) {salt = storage.createSalt()}


  // (B2) SHA512 HASH
  let hash = crypto.createHmac("sha512", salt);
  hash.update(clear);
  return {
    salt: ,
    hash: hash.digest("hex")
  };
};

function createSalt() {
   // (B1) GENERATE RANDOM SALT
   let length = 16;
   let salt =  crypto.randomBytes(Math.ceil(length / 2))
   .toString("hex")
   .slice(0, length); 

   storage.insertSalt(salt)

   return salt
}

function validatePassword(username,password) {

    //get hashed pw based on user
    const hashpassword = storage.getPassword(username)


    let hash = crypto.createHmac("sha512", creeped.salt);
    hash.update(userpass);
    password = hash.digest("hex");
    return password == hashpassword;
}

function encryptPassword(password) {
    return creepy(password)
}

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


module.exports = {createSalt, encryptPassword}
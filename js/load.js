

function showRefreshUI(registration) {
   


    // Get the update modal
    var modal = document.getElementById("updateModal");
    var button = document.getElementById("updateBtn")
    modal.style.display = "block";

  
    button.addEventListener('click', function() {
      if (!registration.waiting) {
        // Just to ensure registration.waiting is available before
        // calling postMessage()
        return;
      }
  
      button.disabled = true;
  
      registration.waiting.postMessage('skipWaiting');
    });
  
  
  };
  
  function onNewServiceWorker(registration, callback) {
    if (registration.waiting) {
      // SW is waiting to activate. Can occur if multiple clients open and
      // one of the clients is refreshed.
      return callback();
    }
  
    function listenInstalledStateChange() {
      registration.installing.addEventListener('statechange', function(event) {
        if (event.target.state === 'installed') {
          // A new service worker is available, inform the user
          callback();
        }
      });
    };
  
    if (registration.installing) {
      return listenInstalledStateChange();
    }
  
    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.addEventListener('updatefound', listenInstalledStateChange);
  }
  
  window.addEventListener('load', function() {
    var refreshing;
    // When the user asks to refresh the UI, we'll need to reload the window
    navigator.serviceWorker.addEventListener('controllerchange', function(event) {
      if (refreshing) return; // prevent infinite refresh loop when you use "Update on Reload"
      refreshing = true;
      console.log('Controller loaded');
      window.location.reload();
    });
  
    navigator.serviceWorker.register('/serviceWorker.js')
    .then(function (registration) {
        // Track updates to the Service Worker.
      if (!navigator.serviceWorker.controller) {
        // The window client isn't currently controlled so it's a new service
        // worker that will activate immediately
        return;
      }
      registration.update();
  
      onNewServiceWorker(registration, function() {
        showRefreshUI(registration);
      });
    });
  });


  //firebase


  let playerId;
  let playerRef;
  let playerServer;
  let players = {};
  let servers = {};


  function initGame() {
    const allPlayersRef = firebase.database().ref(`players`);
    const allServersRef = firebase.database().ref(`servers`);

    allServersRef.on("value", (snapshot) => {
      servers = snapshot.val() || {};
      valChanged();
    })

    allPlayersRef.on("value", (snapshot) => {
      //fires whenever a change occurs
      players = snapshot.val() || {};
      valChanged();

      

    })
    allPlayersRef.on("child_added", (snapshot) => {
      //fire whenever a new node is added to the tree
      const addedPlayer = snapshot.val();
      
      if (addedPlayer.id === playerId) {

      }

    })

  }

  function valChanged() {

    Object.keys(players).forEach((key) => {
      const playerState = players[key];

      //UPDATE VALUES

      //TODO

        //update player name in pre game lobby if screen is shown and player is connected to server

        if (playerState.server !== null) {
          if(document.querySelector('#mpPreGameLobby').display = 'block') {
            Object.keys(servers).forEach((sKey) => {
              //if server is server player is connected to
              if (sKey == playerState.server) {
                //get names from ids
                let playerNames = []
                servers[sKey].playerIds.forEach(id => {
                  playerNames.push(players[id].name)
                })
                document.querySelector('#lobbyplayerlist').innerHTML = playerNames
              } 
            })
          }
        } 

        //update server if screen is shown
        if (document.querySelector('#mpGameListModal').display = 'block') {
          //remove all rows
          $("#gameListTbl tbody tr").remove()
          //add row for each server
          let i = 1
          Object.keys(servers).forEach((sKey) => { 
            let Host
            Object.keys(players).forEach(pKey => {
              if (players[pKey].id == sKey)
              {Host = players[pKey]}
            })
            let playerNames = []
                servers[sKey].playerIds.forEach(id => {
                  playerNames.push(players[id].name)
                })
                document.getElementById('gameListTbl').getElementsByTagName('tbody')[0].innerHTML = `<tr><td id='1 ${i} ID'>${servers[sKey].id}</td><td id='2 ${i} Name'>${servers[sKey].name}</td><td id='3 ${i} Host'>${Host.name}</td><td id='4 ${i} Players'>${playerNames}</td><td id='5 ${i} Options'>-</td></tr>`
            i += 1
          })

        }

        

    
      }
      )


  }

      //firebase authentication listener
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
        console.log('Logged in!')
        playerId = user.uid;
        playerRef = firebase.database().ref(`players/${playerId}`);

        playerRef.set({
          id: playerId,
          name: "Scott",
          server: null,
          isHost: false,
          inGame: false,
          isEliminated: false,
          score: 0,
          pieces: [],
          combo: 1

        })

        //Remove me from firebase when I disconnect
        playerRef.onDisconnect().remove();


        initGame();

        } else {
          console.log('Logged out!')
        }
      })
  
    firebase.auth().signInAnonymously().catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
  
      console.log(errorCode, errorMessage)
    });
  


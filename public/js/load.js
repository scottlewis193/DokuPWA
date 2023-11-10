

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



  


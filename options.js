function save_options() {
  var field = document.getElementById( "fgratio" );
  var fgratio = field.value;
  chrome.storage.local.set( { "fgratio" : fgratio }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.innerHTML = "Options Saved.";
      setTimeout(function() {
          status.innerHTML = "";
      }, 750);
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var field = document.getElementById( "fgratio" );
  chrome.storage.local.get( { "fgratio" : 15 }, function( result ) {
      field.value = result[ "fgratio" ];
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

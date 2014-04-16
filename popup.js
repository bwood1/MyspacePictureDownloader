chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // var dlButton = document.getElementById("downloadButton");
    var dlButton = $("#downloadButton");
    
    var source = request.source;
    var pattern = /photoCarousel"[\s\S]*?img src="(.*?)"/;
    var result = source.match(pattern);
    //console.log("the results are in! " + result);
    message.innerText = "";
    $("#downloadButton").attr('href', result[1]);
    dlButton.innerText = "Click here to open your picture in a new tab."
  }
});

function onWindowLoad() {

    var message = $('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });

}

window.onload = onWindowLoad;

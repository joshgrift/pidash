// our main widget storage
var widgets = {};
var loaded = false;

// mains
window.onload = function(){
  //load our widgets
  var html = "";
  for(var w in config.widgets){
    loadfile("widgets/" + config.widgets[w].id + ".js?version=1","js");
    if(config.widgets[w].css)
      loadfile("widgets/" + config.widgets[w].id + ".css?version=1","css");

    widgets[w] = {
      data:config.widgets[w],
      control:null,
      DOM_icon: null,
      DOM_text: null
    };

    html = html + '<i id="' + config.widgets[w].id + '_icon" class="fas fa-x"></i> <span class="small" id="' + config.widgets[w].id + '_text"></span>';
  }

  //push the widgets html to the page
  document.getElementById("icons").innerHTML = html;

  //load the DOM elements into our widget array
  for(var w in config.widgets){
    widgets[w].DOM_icon = document.getElementById(widgets[w].data.id + "_icon");
    widgets[w].DOM_text = document.getElementById(widgets[w].data.id + "_text");
  }

  // start the clock. It runs every second
  clock();

  // the quick loop, every 10 seconds
  setInterval(quickloop,1000 * 10);
  quickloop();

  //the regular loop, every 10 minutes
  setInterval(loop,1000 * 60 * 10);
  loop();
}

// imports the widget into our widgets list and sets it up
function loadWidget(id, control){
  widgets[id].control = control;
  control.loop();
  control.quickloop();
  updateIcons(id);
}

// every 10 seconds second loop
function quickloop(){
  for(var w in widgets){
    if(widgets[w].control)
      widgets[w].control.quickloop();
    updateIcons(w);
  }
}

// 10 minute loop
function loop(){
  for(var w in widgets){
    if(widgets[w].control)
      widgets[w].control.quickloop();
    updateIcons(w);
  }


}

function updateIcons(w){
  if(widgets[w].DOM_text && widgets[w].control)
    widgets[w].DOM_text.innerHTML = widgets[w].control.text;
  if(widgets[w].DOM_icon && widgets[w].control)
    widgets[w].DOM_icon.className = widgets[w].control.icon;
}

// our clock
function clock(){
  var hour = 0;
  var min = 0;
  setInterval(timer,1000);
  timer();

  function timer(){
    var date = new Date;

    var hr = date.getHours();
    var min = date.getMinutes();
    var apm = "am";

    if(parseInt(hr) > 12){
      hr = parseInt(hr) - 12;
      apm = "pm";
    }

    if(parseInt(min) == 0){
      min = "0";
    }

    if(String(min).length <= 1){
      min = "0" + min;
    }

    document.getElementById('clock').innerHTML = String(hr) + ":" + String(min) + "<span class='clock-small'> " + ""/*apm*/ + "</span>";
  }
}

function bus(){
  var weatherText = document.getElementById("bus_text");

  timer();

  function timer(){
    $.getJSON("http://nwoodthorpe.com/grt/V2/livetime.php?stop=1106",function(data){
      var time = data.data[0].time;
      var departure = data.data[0].departure;

      var distanceOut = departure - time;
      var eta = Math.ceil(distanceOut/60);

      weatherText.innerHTML = eta;
    });
  }

  setInterval(timer,30 * 1000);
}

function checkServer(){
  var text = document.getElementById("server_text");
  text.innerHTML = "-";

  setInterval(timer,1000);

  function timer(){
    $.ajax({
      url: "http://rocket1.grift.ca/status.txt?t=" + Date.now(),
      dataType: 'text',
      success: function(data){
        text.innerHTML = "1";
      },
      error: function(data){
        text.innerHTML = "0";
      }
    });
  }
}

// Copied from https://stackoverflow.com/a/5762713/4314753
function loadfile(filename, filetype){
  if (filetype=="js"){ //if filename is a external JavaScript file
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
  }
  else if (filetype=="css"){ //if filename is an external CSS file
    var fileref=document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
  }
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

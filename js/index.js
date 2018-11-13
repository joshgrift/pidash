//weather icons
//https://developer.yahoo.com/weather/documentation.html?guccounter=1
var weathericons = {
  0: "exclamation-triangle",
  1: "exclamation-triangle",
  2: "exclamation-triangle",
  3: "bolt",
  4: "bolt",
  5: "snowflake",
  6: "snowflake",
  7: "snowflake",
  8: "snowflake",
  9: "tint",
  10: "exclamation",
  11: "tint",
  12: "tint",
  13: "snowflake",
  14: "snowflake",
  15: "snowflake",
  16: "snowflake",
  17: "snowflake",
  18: "snowflake",
  19: "sun",
  20: "eye-slash",
  21: "cloud",
  22: "cloud",
  23: "cloud",
  24: "sun",
  25: "sun",
  26: "cloud",
  27: "cloud",
  28: "cloud",
  29: "cloud",
  30: "cloud",
  31: "sun",
  32: "sun",
  33: "sun",
  34: "sun",
  35: "tint",
  36: "sun",
  37: "bolt",
  38: "bolt",
  39: "bolt",
  40: "tint",
  41: "snowflake",
  42: "snowflake",
  43: "snowflake",
  44: "cloud",
  45: "bolt",
  46: "snowflake",
  47: "bolt",



  3200: "times",
}

// mains
window.onload = function(){
  setTimeout(function(){ location.reload(); }, 20 * 60 * 1000);
  clock();
  weather();
  bus();
  checkServer();
}

function clock(){
  var hour = 0;
  var min = 0;
  setInterval(timer,1000);

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

function weather(){
  var codetoimage = [

  ]
  var weatherText = document.getElementById("weather_text");
  var weatherIcon = document.getElementById("weather_icon");

  var locationQuery = escape("select item from weather.forecast where woeid in (select woeid from geo.places where text='waterloo,ca') and u='c'");
  $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json&callback=?",function(data){
    data = data.query.results.channel[0].item;
    //var html = "";
    //var weather = data.forecast[0].text;
    //var code = data.forecast[0].code;

    //html = "<br>Hi: " + data.forecast[0].high + " <br> Lo: " + data.forecast[0].low;
    //html = "<br>Hi: " + data.forecast[0].high + " <br> Lo: " + data.forecast[0].low;
    weatherIcon.className += " fa-" + weathericons[data.forecast[0].code];
    weatherText.innerHTML = data.condition.temp;
  });
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

/*

Weather Addon
@author Josh Grift
@version 1

@data
  appid - openweathermap.org api key
  city  - city for data to come from

*/

widgetDirectory.Weather = function(data){
  // 10 second loop
  this.quickloop = null;

  // 10 min loop
  this.loop = function(callback){
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + data.city + "&appid=" + data.appid + "&units=metric",function(data){
      var icon = "owf owf-" + data.weather[0].id + "-d";
      var text = Math.round(data.main.temp);
      callback(icon, text);
    });
  }
}

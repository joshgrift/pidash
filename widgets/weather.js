/*

Weather Addon
@author Josh Grift
@version 1

@data
  appid - openweathermap.org api key
  city  - city for data to come from

*/
class Weather {
  constructor(data){
    //icon and text variables
    this.icon = "owf owf-800-d";
    this.text = "-6";
    this._data = data;
  }

  // 10 min loop
  loop(){
    // $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + this._data.city + "&appid=" + this._data.appid + "&units=metric",function(data){
    //  this.icon = "";//data.weather[0].id
    //  this.text = Math.round(data.main.temp);
    // });
  }

  // 10 second loop
  quickloop(){
    return null;
  }
}

var obj = new Weather(config.widgets.weather.data);

loadWidget("weather", obj);

/*

Weather Addon
@author Josh Grift
@version 1

@data
  appid - openweathermap.org api key
  city  - city for data to come from

*/
class Status {
  constructor(data){
    //icon and text variables
    this.icon = "fas fa-server";
    this.text = "1";
    this._data = data;
  }

  // 10 min loop
  loop(){
    $.ajax({
      url: this._data.url + "?t=" + Date.now(),
      dataType: 'text',
      success: function(data){
        this.text = "1";
      },
      error: function(data){
        this.text = "0";
      }
    });
  }

  // 10 second loop
  quickloop(){
    return null;
  }
}

var obj = new Status(config.widgets.status.data);

loadWidget("status", obj);

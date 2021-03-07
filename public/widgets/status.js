/*

Status addon. Is 1 when on, and 0 when off.
@author Josh Grift
@version 1

@data
  url - status url

*/

widgetDirectory.Status = function(data){
  // 10 min loop
  this.loop = null;

  // 10 second loop
  this.quickloop = function(callback){
    $.ajax({
      url: data.url + "?t=" + Date.now(),
      dataType: 'text',
      success: function(){
        callback("fas fa-server","1");
      },
      error: function(){
        callback("fas fa-server","0");
      }
    });
  }
}

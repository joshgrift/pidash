/*

Bus Widget
@author Josh Grift
@version 1

@data
  stop - id of bus stop

*/

widgetDirectory.GRTbus = function (data) {
  // 10 min loop
  this.loop = null;

  // 10 second loop
  this.quickloop = async function (callback) {
    var result = await r(
      "http://nwoodthorpe.com/grt/V2/livetime.php?stop=" + data.stop
    );

    try {
      var time = result.data[0].time;
      var departure = result.data[0].departure;

      var distanceOut = departure - time;
      var eta = Math.ceil(distanceOut / 60);
    } catch (err) {
      var eta = "&#8734";
    }
    callback("fas fa-bus", eta);
  };
};

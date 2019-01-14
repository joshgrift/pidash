var config = {
  backgroundUrl:"https://i.redd.it/mcljmha8ufb01.jpg",
  widgets:{
    weather: {
      id:"weather",
      css:true,
      data:{appid:"xxxxxxxxxxx",city:"Los Angeles"}
    },
    status: {
      id:"status",
      css:false,
      data:{url:"https://example.com/status.txt"}
    },
    bus: {
      id:"bus",
      css:false,
      data:{url:"https://myfavouritebuscompany.com/api/bus.php?stop=1106"}
    }
  }
}

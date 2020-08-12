var config = {
  backgroundImages:[
      "/img/bunnies.jpg", // https://i.imgur.com/mE1MUpd.jpeg
      "https://i.imgur.com/nR8jJEM.jpeg",
      "https://live.staticflickr.com/5443/9369949185_0846c27d6c_b.jpg",
      "https://live.staticflickr.com/3804/11623216156_9e9f5eaa4a_c.jpg",
  ],
  widgets:[
    {
      widget:"GRTbus",
      data:{stop:"5008"}
    },
    {
      widget:"Status",
      data:{url:"https://example.com/status.txt"}
    },
    {
      widget:"Weather",
      data:{appid:"xxxxxxxxx",city:"Waterloo"}
    }
  ]
};

# piDash
> Simplified clock/dashboard aimed at raspberry pi

## How to use
- Download and open index.html
- Disable Cross-Origin Restrictions to enable non-https api(s)
- customize widgets with config.js

## Docs
### config.js
```javascript
var config = {
  backgroundImages:[
    "https://i.imgur.com/mE1MUpd.jpeg",
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
```
The config file allows you to select widgets and set the background images. The widget tag refers to the name of the function in the file and the data is passed to the widget constructor. We can include multiple instances of the same widget as well.

### Widgets
Widgets are added via a single js file in `/widgets` in the template below:
```javascript
/*
{Widget Description}
@author {author}
@version 1.0

@data
  {id} - {description}

*/

widgetDirectory.{Widget ID} = function(data){
  // 10 second loop
  // we've decided not to use this loop, we still have to define it
  this.quickloop = null;

  // 10 min loop
  this.loop = function(callback){
    $.getJSON("https://exampleurl.com?a=" + data.{id},function(value){
      //icon class from owf or font awesome fonts
      var icon = "owf owf-" + value.icon + "-d";
      //the text (usually a single or double digit number)
      var text = value.text;
      // callback to pass the information to the display
      callback(icon, text);
    });
  }
}
```
Unfortunately, we need to include the js file in the top of index.html right now. (see [issue #1](https://github.com/dotjersh/pidash/issues/1#issue-399087514))

## Contributing
Feel free to submit a PR request with additions and/or bug fixes!

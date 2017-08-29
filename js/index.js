var api = "https://api.openweathermap.org/data/2.5/weather?";
var apikey = "&APPID=58a716b5afe5250e4f7c3aca222f9267"
var backgrounds = {
  "Clouds":"https://wallpapercave.com/wp/4QyIoZO.jpg",
  "Thunderstorm":"https://static1.squarespace.com/static/53e211f2e4b08ac0a8ed5c55/t/53e9ecfae4b042129f460d6f/1407839484047/WTF+yellow.jpg?format=2500w",
  "Drizzle":"https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Rain-Window-Background-Free-Download-PIC-WPD005219.jpg",
  "Rain":"https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Rain-Window-Background-Free-Download-PIC-WPD005219.jpg",
  "Snow":"http://hd.wallpaperswide.com/thumbs/snow_falling-t2.jpg",
  "Atmosphere":"https://static1.squarespace.com/static/53e211f2e4b08ac0a8ed5c55/t/53e9ecfae4b042129f460d6f/1407839484047/WTF+yellow.jpg?format=2500w",
  "Clear":"https://cdn.wallpapersafari.com/27/26/iQOCDY.jpg",
  "Extreme":"https://static1.squarespace.com/static/53e211f2e4b08ac0a8ed5c55/t/53e9ecfae4b042129f460d6f/1407839484047/WTF+yellow.jpg?format=2500w",
  "Haze":"https://c.pxhere.com/photos/7f/61/photo-115607.jpg!d",
  "Default":"https://cdn.wallpapersafari.com/27/26/iQOCDY.jpg"
}

$(document).ready(function() {
  
  getLocation();
 
  $(".weather").click(function(e) {
    e.preventDefault();
    getLocation();
  });

  $("#temp-unit").click(function(e) {
    e.stopPropagation();
    changeTempUnit();
  });
  
});

function getLocation(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = "lat=" + position.coords.latitude;
        var lon = "lon=" + position.coords.longitude;
        getWeather(lat, lon);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
};

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon + apikey;
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      var tempInCelcius = (result.main.temp - 273.15).toFixed(1);
      $("#temp").text(tempInCelcius);
      $("#temp-unit").text("°C");
      $("#desc").text(" - " + result.weather[0].description);
      var d = new Date();
      $("#last-refresh").text(d.getHours() + ":" + d.getMinutes() + " - " + d.getDate() + "/" + d.getMonth() + "/" + d.getYear());
      setBackGround(result.weather[0].main);
    }
  });
};

function setBackGround(weatherCondition){
  if (backgrounds[weatherCondition] === undefined){
    //set default
    $(".container-fluid").css("background-image", backgrounds["Default"]);
  } else {
    //set specific
    $(".container-fluid").css("background-image", 'url("' + backgrounds[weatherCondition] + '")');
  }
};

function changeTempUnit(){
  var currentUnit = $("#temp-unit").text();
  var newUnit = currentUnit == "°C" ? "°F" : "°C";
  $("#temp-unit").text(newUnit);
  var tempCurrentUnit = $("#temp").text();
  var tempNewUnit = currentUnit == "°C" ? (tempCurrentUnit*9/5+32).toFixed(1) : ((tempCurrentUnit-32)*5/9).toFixed(1);
  $("#temp").text(tempNewUnit);
};
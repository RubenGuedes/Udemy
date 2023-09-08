const BODY_PARSER = require('body-parser');
const EXPRESS = require('express');
const HTTPS = require('https');

const APP = EXPRESS();
const PORT = 8080;


APP.use(BODY_PARSER.urlencoded({extended: true}));

// SEND CSS FILE
APP.get('/index.css', function(req, res) {
  res.sendFile(__dirname + "/index.css");
});

APP.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

APP.post('/', function(req, res) {

  const QUERY = req.body.cityName;
  const APIKEY = "72146a69ce7ea961cedc2c53f2577ae0";
  const METRIC = "metric"
  const URL = "https://api.openweathermap.org/data/2.5/weather?q="+ QUERY +"&appid=" + APIKEY + "&units=" + METRIC;

  // Get response
  HTTPS.get(URL, function(response) {

    // Get Data
    response.on("data", function(data) {
      // PARSE DATA TO JSON
      const WEATHER = JSON.parse(data);

      // Ger parsed info
      const DESCRIP = WEATHER.weather[0].description;
      const TEMP_VAL = WEATHER.main.temp;
      const ICON = WEATHER.weather[0].icon;
      const IMAGE_URL = "http://openweathermap.org/img/wn/" + ICON + "@2x.png";

      // ATENTION res != response
      res.write("<img src=" + IMAGE_URL+ ">");
      res.write("<h1>Temperature in "+ QUERY +" = " + TEMP_VAL+ "</h1>");
      res.write("<h2>Description = " + DESCRIP + "</h2>");
      res.send();
    });

  });
});

APP.listen(PORT, function() {
  console.log("Working in port " + PORT);
});

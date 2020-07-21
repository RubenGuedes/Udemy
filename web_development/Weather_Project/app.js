const EXPRESS = require('express');
const HTTPS = require('https');

const APP = EXPRESS();
const PORT = 8080;


APP.get('/', function(req, res) {
  const URL = "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=72146a69ce7ea961cedc2c53f2577ae0&units=metric";

  // Get response
  HTTPS.get(URL, function(response) {

    // Get Data
    response.on("data", function(data) {
      // PARSE DATA TO JSON
      const WEATHER = JSON.parse(data);

      const DESCRIP = WEATHER.weather.description;
      const TEMP_VAL = WEATHER.main.temp;

      // ATENTION res != response
      res.write("<h1>Res = " + TEMP_VAL+ "</h1>");
      res.write("<h2>Description = " + DESCRIP + "</h2>");
      res.send();
    });

  });
});

APP.listen(PORT, function() {
  console.log("Working in port " + PORT);
});

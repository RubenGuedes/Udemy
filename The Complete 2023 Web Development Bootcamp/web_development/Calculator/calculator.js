const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended: true}));

/**
 * Root
 */
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {
  let v1 = Number(req.body.num1);
  let v2 = Number(req.body.num2);

  let calc = v1 + v2;
  res.send("The result is: " + calc);
});

/**
 * BMI Calculator
 */
app.get('/bmicalculator', function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/bmicalculator', function(req, res) {
  let w = parseFloat(req.body.weight);
  let h = parseFloat(req.body.height);

  let n = w / (h * h);
  res.send("Your BMI is " + n);
});

/**
 * Listen Port
 */
app.listen(port, function(req, res) {
  console.log("Server is running on port: " + port);
});

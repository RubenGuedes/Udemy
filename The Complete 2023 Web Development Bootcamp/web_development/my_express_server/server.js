const express = require('express');

const app = express();
const port = 8080;

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>");
});

app.get('/contact', function(req, res) {
  res.send("Contact: ....@gmail.com");
});

app.get('/about', function(req, res) {
  res.send("<strong>About me:</strong> I'm new to this.");
});
app.listen(port, function() {
  console.log("Server working");
});

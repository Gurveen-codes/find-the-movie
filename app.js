var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("search");
});

app.get("/results", function (req, res) {
  var search = req.query.search;
  var url = "http://www.omdbapi.com/?s=" + search + "&apikey=thewdb";
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", { data: data });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has Started");
});

var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  axios
    .get("http://www.echojs.com/")
    .then(function(response) {
      var $ = cheerio.load(response.data);

      $("article h2").each(function(i, element) {
        var result = {};

        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        db.Article.create(result)
          .then(function(dbArticle) {})
          .catch(function(err) {
            console.log(err);
          });
      });
    })
    .then(function() {
      res.end();
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
});

app.get("/articles", function(req, res) {
  db.Article.find({ saved: false })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.put("/articles", function(req, res) {
  db.Article.findOneAndUpdate({ _id: req.body.params.id }, { saved: true })
    .then(function(result) {
      res.end();
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/clear", function(req, res) {
  db.Article.remove({ saved: false })
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/clearsaved", function(req, res) {
  db.Article.remove({ saved: true })
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/saved", function(req, res) {
  res.render("saved");
});

app.get("/savedarticles", function(req, res) {
  db.Article.find({ saved: true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";

mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;

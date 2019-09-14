var exports = (module.exports = {});
var db = require("../models");

exports.saved = function(req, res) {
  var articles;
  db.Article.find({ saved: true })
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      articles = dbArticle;
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  res.render("saved");
};

exports.index = function(req, res) {
  var articles;
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      articles = dbArticle;
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  res.render("index", articles);
};

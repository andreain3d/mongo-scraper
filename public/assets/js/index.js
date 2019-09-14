$(document).ready(function() {
  $(".save").on("click", function() {});

  $(".scrape").on("click", function() {
    $.get("/scrape").then(function(data) {
      console.log("this is also running");
      reloadPage();
    });
  });

  $(".clear").on("click", function() {
    $.get("/clear").then(function() {
      $(".article-container").empty();
      reloadPage();
    });
  });

  var reloadPage = function() {
    $.get("/articles").then(function(data) {
      $(".article-container").empty();
      if (data.length) {
        showArticles(data);
      } else {
        noArticles();
      }
    });
  };

  var noArticles = function() {
    $(".article-container").append(
      $("<h2>").text("There are no articles to display.  Try a new scrape.")
    );
  };

  var showArticles = function(data) {
    for (var i = 0; i < data.length; i++) {
      var card = $("<div class='card'>");
      var header = $("<div class='card-header'>").append(
        $("<h3>").append(
          $("<a>")
            .attr("href", data[i].link)
            .text(data[i].title)
        )
      );
      var body = $("<div class='card-body'>").text(
        data[i].summary || "Here's a summary!"
      );

      $(".article-container").append(card.append(header, body));
    }
  };

  reloadPage();
});

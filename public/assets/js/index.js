$(document).ready(function() {
  $(document).on("click", ".save", function() {
    var savedid = $(this).attr("data-id");
    console.log(savedid);
    axios
      .put("/articles", {
        params: {
          id: savedid
        }
      })
      .then(function() {
        reloadPage();
      });
  });

  $(".scrape").on("click", function() {
    $.get("/scrape").then(function() {
      console.log("this is running");
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
            .text(data[i].title),
          $(
            "<a data-id= '" +
              data[i]._id +
              "'class='btn btn-info save'>Save Article</a>"
          )
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
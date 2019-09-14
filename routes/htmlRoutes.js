var controller = require("../controllers/controller.js");

module.exports = function(app) {
  app.get("/", controller.index);

  app.get("/saved", controller.saved);
};

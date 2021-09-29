var express = require("express");

var router = express.Router();

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.get("/services", function (req, res) {
  res.render("services");
});

router.get("/projects", function (req, res) {
  res.render("projects");
});

router.get("/home", function (req, res) {
  res.render("home");
});

router.get("/", function (req, res) {
  res.render("home");
});


module.exports = router;


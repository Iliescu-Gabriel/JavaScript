var express = require("express");
var router = express.Router();
const { mainPage } = require("../controllers/authController");

/* GET home page. */
router.get("/", mainPage);

router.get("/allvideos", function (req, res, next) {
  res.render("viewAllVideos");
});

module.exports = router;

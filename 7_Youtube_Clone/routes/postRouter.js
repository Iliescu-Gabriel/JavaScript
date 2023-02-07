var express = require("express");
var router = express.Router();

const {
  createNewPost,
  getSinglePost,
  getPostToEdit,
  deletePost,
  editPost,
  viewMyPosts,
} = require("../controllers/postController");

router.get("/newPost", function (req, res, next) {
  res.render("createNewPost");
});
router.get("/myPosts", viewMyPosts);

router.post("/newPost", createNewPost);
router.post("/viewSinglePost", getSinglePost);
router.post("/postToEdit", getPostToEdit);
router.post("/editPost", editPost);
router.post("/deletePost", deletePost);

module.exports = router;

const Post = require("../model/Post");
const { authenticateUser } = require("../utils/");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const createNewPost = async (req, res) => {
  const token = req.signedCookies.token;
  // Check to see if the user has logged in
  if (!token) {
    res.redirect("/users/login");
    return;
  }
  const userInfo = await authenticateUser(token);
  if (!userInfo) {
    res.redirect("/users/login");
    return;
  }
  // Do some checks so that the database won't throw an error
  const { title, comment } = req.body;
  if (!title || !comment) {
    res.render("createNewPost", { msg: "Please complete all fields" });
    return;
  }
  if (title.length < 5 || title.length > 30) {
    res.render("createNewPost", {
      msg: "Title must be between 5 and 30 characters long!",
    });
    return;
  }
  if (comment.length < 10 || comment.length > 200) {
    res.render("createNewPost", {
      msg: "Comments must be between 10 and 200 characters long!",
    });
    return;
  }
  // Check if the user has sent a file
  if (!req.files) {
    res.render("createNewPost", {
      msg: "You must upload a video file",
    });
    return;
  }
  // Check if the file uploaded by the user is a video
  if (!req.files.video.mimetype.startsWith("video")) {
    res.render("createNewPost", {
      msg: "You must upload a video file",
    });
    return;
  }
  // Filesize constrain in megabytes
  const maxSize = 1024 * 1024 * 10;
  if (req.files.video.size > maxSize) {
    res.render("createNewPost", {
      msg:
        "Please upload a video file smaller than " + maxSize / 1048576 + "mb",
    });
    return;
  }
  // Upload video to Cloudinary and store the info
  const videoUpload = await cloudinary.uploader.upload(
    req.files.video.tempFilePath,
    {
      resource_type: "video",
      use_filename: true,
      folder: "youtube_clone",
    }
  );
  Post.create({
    title,
    comment,
    user: userInfo.user.userId,
    video: videoUpload.secure_url,
  });
  // Remove temporary files
  fs.unlinkSync(req.files.video.tempFilePath);
  res.render("createNewPost", { msg: "Post created" });
};

const getSinglePost = async (req, res) => {
  const { postId } = req.body;
  const post = await Post.findById(postId).populate({
    path: "user",
    select: "name",
  });
  res.render("viewSinglePost", { post });
};

const viewMyPosts = async (req, res) => {
  // Check the token to see if the user has logged in
  //    if the user is not logged send him/her to the login page
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/users/login");
    return;
  }
  const userInfo = await authenticateUser(token);
  if (!userInfo) {
    res.redirect("/users/login");
    return;
  }
  // Find all posts asociated with the user using it's id
  //     add the user's information to the return value
  const myPosts = await Post.find({ user: userInfo.user.userId }).populate({
    path: "user",
    select: "name",
  });
  res.render("viewMyPosts", { myPosts });
};

// Renders the editPost page
const getPostToEdit = async (req, res) => {
  // Check the token to see if the user has logged in
  //    if the user is not logged send him/her to the login page
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/users/login");
    return;
  }
  const userInfo = await authenticateUser(token);
  if (!userInfo) {
    res.redirect("/users/login");
    return;
  }
  // Find the post and add the user's info to it
  const { postId } = req.body;
  const postToEdit = await Post.findById(postId).populate({
    path: "user",
    select: "name",
  });
  // If the post is not found redirect user to main page
  if (!postToEdit) {
    res.redirect("/");
    return;
  }
  res.render("editPost", { postToEdit });
};

// Actually changes data in the post
const editPost = async (req, res) => {
  // Check the token to see if the user has logged in
  //    if the user is not logged send him/her to the login page
  const token = req.signedCookies.token;
  if (!token) {
    res.redirect("/users/login");
    return;
  }
  const userInfo = await authenticateUser(token);
  if (!userInfo) {
    res.redirect("/users/login");
    return;
  }
  // Unpack post request data
  const { postId } = req.body;
  const { title } = req.body;
  const { comment } = req.body;
  // Get the post we are about to edit from the db
  const postToEdit = await Post.findById(postId).populate({
    path: "user",
    select: "name",
  });
  // Validate the data provided and modify the posts accordingly
  //  EX. if the user only wants to change the title then change only the title
  if (title && (title.length < 5 || title.length > 30)) {
    res.render("editPost", {
      postToEdit,
      msg: "Comments must be between 10 and 200 characters long!",
    });
    return;
    // Modify only the post's title
  } else if (title) {
    const updated = await Post.findOneAndUpdate(
      { _id: postId },
      { title },
      { new: true, runValidators: true }
    );
    res.render("editPost", { postToEdit: updated, msg: "Edit success" });
    return;
  }
  if (comment && (comment.length < 10 || comment.length > 200)) {
    res.render("editPost", {
      postToEdit,
      msg: "Comments must be between 10 and 200 characters long!",
    });
    return;
    // Modify only the post's comment
  } else if (comment) {
    const updated = await Post.findOneAndUpdate(
      { _id: postId },
      { comment },
      { new: true, runValidators: true }
    );
    res.render("editPost", { postToEdit: updated, msg: "Edit success" });
    return;
  }
  if (!comment && !title) {
    res.render("editPost", { postToEdit, msg: "No changes made" });
    return;
  }
  // Modify both
  const updated = await Post.findOneAndUpdate(
    { _id: postId },
    { title, comment },
    { new: true, runValidators: true }
  );
  res.render("editPost", { postToEdit: updated, msg: "Edit success" });
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  const deletedPost = await Post.findByIdAndDelete(postId);
  res.redirect("/posts/myPosts");
};

module.exports = {
  createNewPost,
  getSinglePost,
  getPostToEdit,
  deletePost,
  editPost,
  viewMyPosts,
};

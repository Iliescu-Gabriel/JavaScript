const User = require("../model/User");
const Post = require("../model/Post");

const {
  attachCookiesToResponse,
  createTokenUser,
  authenticateUser,
} = require("../utils/");

const mainPage = async (req, res) => {
  // Get all posts from the database
  const allPosts = await Post.find({}).populate({
    path: "user",
    select: "name",
  });
  // Check the ticket to see if the user has logged and
  //     send the info to the front-end
  const token = req.signedCookies.token;
  if (!token) {
    res.render("mainPage", { allPosts });
    return;
  }
  const userInfo = await authenticateUser(token);
  if (!userInfo) {
    res.render("mainPage", { allPosts });
    return;
  }
  res.render("mainPage", { user: userInfo.user.name, allPosts });
};

const login = async (req, res) => {
  // Unpack data
  const { email, password } = req.body;
  // Check if the user sent all data necessary
  if (!email || !password) {
    res.render("./users/login", { msg: "Please enter valid credentials" });
    return;
  }
  // Check if the email provided is associated to an account
  const user = await User.findOne({ email });
  if (!user) {
    res.render("./users/login", { msg: "Please enter valid credentials" });
    return;
  }
  // Check if the password is correct
  const passwordsMatch = await user.comparePassword(password);
  if (!passwordsMatch) {
    res.render("login", { msg: "Please enter valid credentials" });
    return;
  }
  // Create a token and attach it to response
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.redirect("/");
};

const register = async (req, res) => {
  // Unpack data
  const { name, email, password } = req.body;
  // Check if the information provided is complete
  if (!name || !email || !password) {
    res.render("register", { msg: "Please complete all fields" });
    return;
  }
  // Check username length
  if (name.length < 4 || name.length > 16) {
    res.render("register", {
      msg: "Username must be between 4 and 16 characters long",
    });
    return;
  }
  // Check password length
  if (password.length < 6) {
    res.render("register", {
      msg: "Password too short",
    });
    return;
  }
  // Check if the email provided is already associated to an account
  const user = await User.findOne({ email });
  if (user) {
    res.render("register", { msg: "User already exists!" });
    return;
  }
  // The first user registered is granted admin privileges
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  // Create user
  User.create({ name, email, password, role });
  res.render("register", { msg: "register successful" });
};

const logout = (req, res) => {
  // Override token
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
};

module.exports = {
  login,
  register,
  logout,
  mainPage,
};

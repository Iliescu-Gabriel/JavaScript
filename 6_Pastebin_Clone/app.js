const express = require("express");
const app = express();
const routes = require("./routes/routes");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// routes
app.use("/", routes);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {}
};

start();

const notFound = (req, res) =>
  res.render("./errors/notFound", { title: "Not Found!" });

module.exports = notFound;

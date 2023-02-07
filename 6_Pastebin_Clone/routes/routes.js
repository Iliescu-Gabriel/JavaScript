const express = require("express");
const router = express.Router();

const {
  getAllPastes,
  createPaste,
  getPaste,
  updatePaste,
  deletePaste,
} = require("../controlers/controller");

router.route("/").get(getAllPastes);
router.route("/").post(createPaste);
router.route("/G:id").get(getPaste);
router.route("/D:id").get(deletePaste);
router.route("/E:id").post(updatePaste);

module.exports = router;

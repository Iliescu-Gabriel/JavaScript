const Paste = require("../models/model");
const asyncWrapper = require("../middleware/async");

const getAllPastes = asyncWrapper(async (req, res) => {
  const pastes = await Paste.find({});
  res.render("index", { pastes });
});

const createPaste = asyncWrapper(async (req, res) => {
  await Paste.create(req.body);
  const pastes = await Paste.find({});
  res.render("index", { pastes, addPasteSuccess: 1 });
});

const getPaste = asyncWrapper(async (req, res, next) => {
  const { id: pasteID } = req.params;
  const paste = await Paste.findOne({ _id: pasteID });
  res.render("editPaste", { paste });
});

const updatePaste = asyncWrapper(async (req, res) => {
  const { id: pasteID } = req.params;
  const paste = await Paste.findOneAndUpdate({ _id: pasteID }, req.body, {
    new: true,
    runValidator: true,
  });
  res.render("editPaste", { paste, editPasteSuccess: 1 });
});

const deletePaste = asyncWrapper(async (req, res) => {
  const { id: pasteID } = req.params;
  await Paste.findOneAndDelete({ _id: pasteID });
  const pastes = await Paste.find({});
  res.render("index", { pastes, deletePasteSuccess: 1 });
});

module.exports = {
  getAllPastes,
  createPaste,
  getPaste,
  updatePaste,
  deletePaste,
};

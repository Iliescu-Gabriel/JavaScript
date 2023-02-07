const mongoose = require("mongoose");

const PasteSchema = new mongoose.Schema({
    pasteTitle: {
        type: String,
        required: [true, "must provide paste title"],
        trim: true,
        maxLength: [20, "Paste title can not be more than 20 characters"],
    },
    pasteText: {
        type: String,
        required: [true, "must provide a paste"],
        maxLength: [1000, "paste can not be more than 1000 characters"],
    },
});

module.exports = mongoose.model("Paste", PasteSchema);

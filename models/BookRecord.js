const mongoose = require("mongoose");

const BookRecordSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  PublishedDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Bookrecord", BookRecordSchema);

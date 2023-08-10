const mongoose = require("mongoose");

const whiteListSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      require: true,
      trim: true,
    },
    nickMc: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("whiteList", whiteListSchema);

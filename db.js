const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://tecsup:${process.env.PASSWORD}@cluster0.dex2owl.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(">>> DB is connect");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ConnectDb,
};

const User = require("../model/whiteList.model.js");

const listar = async (req, res) => {
  try {
    const data = await User.find();
    /* console.log(data); */

    res.render("whiteList", {
      arrayDatos: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCrear = (req, res) => {
  res.render("createUser");
};

const crear = async (req, res) => {
  const { idUser, nickMc } = req.body;

  try {
    const newUser = new User({
      idUser,
      nickMc,
    });
    newUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listar,
  crear,
  getCrear,
};

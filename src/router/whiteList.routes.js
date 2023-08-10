const express = require("express");
const router = express.Router();
const {
  listar,
  crear,
  getCrear,
} = require("../controllers/whiteList.controller.js");

router.get("/", listar);
router.get("/crear", getCrear);
router.post("/crear", crear);

module.exports = {
  router,
};

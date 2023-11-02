const express = require("express");
const bodyParser = require("body-parser");
const { ConnectDb } = require("./db.js");
const { router } = require("./src/router/whiteList.routes.js");
const { ConnectDiscord, ListRoles, BanList } = require("./discord.js");
const app = express();

// Para que nodejs pueda leer datos JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/src/view");

//usar archivos css y js
app.use(express.static(__dirname + "/src/public"));

//Rutas Web
app.use("/", router);

//Conectar MONGODB
ConnectDb();

//Crear Servidor
app.listen(3366, () => {
  console.log(` Servidor corriendo en el puerto: http://localhost:3366/`);
});

//Discord
ConnectDiscord();
ListRoles();
BanList();

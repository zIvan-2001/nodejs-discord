const User = require("./src/model/whiteList.model.js");
const express = require("express");
const bodyParser = require("body-parser");
const { ConnectDb } = require("./db.js");
const { router } = require("./src/router/whiteList.routes.js");
const { client } = require("./discord.js");
require("dotenv").config();
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

ConnectDb();
app.listen(3366, () => {
  console.log(` Servidor corriendo en el puerto: http://localhost:3366/`);
});

//Discord
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "oplist") {
    const usersId = await User.find();
    usersId.forEach(async (user) => {
      const member = await message.guild.members.fetch(user.idUser);
      if (member) {
        // Obtener los roles del usuario
        const roles = member.roles.cache.map((role) => role.name);
        const rolesString = roles.join(", ");
        message.channel.send(
          `Roles de ${member.user.username}: ${rolesString}`
        );
        console.log(member.user);
      }
    });
  }
});

client.login(`${process.env.DISCORD_KEY}`);

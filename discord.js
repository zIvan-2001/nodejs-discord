const { Client, IntentsBitField } = require("discord.js");
const User = require("./src/model/whiteList.model.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const ConnectDiscord = () => {
  try {
    client.login(`${process.env.DISCORD_KEY}`);
    client.on("ready", () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

const ListRoles = () => {
  client.on("messageCreate", async (message) => {
    if (message.content === "oplist") {
      const guild = client.guilds.cache.get("1138282413450068059");
      const usersId = await User.find();
      usersId.forEach(async (user) => {
        const member = await message.guild.members.fetch(user.idUser);
        const memberTag = await guild.members.fetch(user.idUser);

        if (member || memberTag) {
          // Obtener los roles del usuario
          const roles = member.roles.cache.map((role) => role.name);
          const rolesString = roles.join(", ");
          message.channel.send(
            `Roles de ${member.user.username}: ${rolesString} : ${memberTag.user.tag}`
          );
        }
      });
    }
  });
};

/* const ObtenerRol = () => {
  client.on("messageCreate", async (message) => {
    if (message.content === "tag") {
      const userId = "600454190052933642"; // Reemplazar con el ID del usuario que deseas buscar
      const guild = client.guilds.cache.get("1138282413450068059");

      if (!guild) {
        return console.log("Servidor no encontrado");
      }

      const member = await guild.members.fetch(userId);

      if (member) {
        console.log(`Tag del usuario: ${member.user.tag}`);
      } else {
        console.log("Usuario no encontrado en el servidor");
      }
    }
  });
}; */

module.exports = {
  ConnectDiscord,
  ListRoles,
  /*   ObtenerRol, */
};

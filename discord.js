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
    if (message.content === "!all") {
      const guild = client.guilds.cache.get("1138282413450068059");
      const usersId = await User.find();
      usersId.forEach(async (user) => {
        const member = await message.guild.members.fetch(user.idUser);
        const memberTag = await guild.members.fetch(user.idUser);
        const mcNick = user.nickMc;

        if (member && memberTag) {
          // Obtener los roles del usuario
          const roles = member.roles.cache.map((role) => role.name);
          const rolesString = roles.join(", ");
          message.channel.send(
            `**UserName:** ${member.user.username}:\n**ROLES:** ${rolesString}\n **TAG:** ${memberTag.user.tag}\n **mcNick:** __${mcNick}__ `
          );
        }
      });
    }
  });
};

const BanList = () => {
  client.on("messageCreate", async (message) => {
    if (message.content.startsWith("!ban")) {
      try {
        const userId = await User.find(); // Segundo argumento después del comando es el ID del usuario

        userId.forEach(async (id) => {
          const user = await client.users.fetch(id.idUser);
          if (!user) {
            return message.channel.send(
              `No se encontró un usuario con ID ${id.idUser}.`
            );
          }

          const member = message.guild.members.cache.get(id.idUser);
          if (!member) {
            return message.channel.send(
              `El usuario con ID ${user.idUser} no es miembro del servidor.`
            );
          }

          const roles = member.roles.cache;
          if (roles.size === 1) {
            // El tamaño 1 incluye el rol @everyone
            message.channel.send(
              `${user.tag} no tiene roles. \n **NickMC:** ${id.nickMc} `
            );
          }
        });
      } catch (error) {
        console.error(error);
        message.channel.send("Ocurrió un error al procesar la solicitud.");
      }
    }
  });
};

module.exports = {
  ConnectDiscord,
  ListRoles,
  BanList,
};

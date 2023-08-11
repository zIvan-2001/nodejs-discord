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
    if (message.content === "!All") {
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

const ListRolesUndefined = () => {
  const roleId = "1139355839669473321";
  client.on("messageCreate", (message) => {
    if (message.content === "!kick") {
      const role = message.guild.roles.cache.get(roleId);

      if (role) {
        const membersWithRole = role.members.map((member) => member.user.tag);
        const listaUsuarios = membersWithRole.join("\n");

        if (listaUsuarios) {
          message.channel.send(
            `Sin membrias "${role.name}":\n${listaUsuarios}`
          );
        } else {
          message.channel.send("No hay usuarios por banear");
        }
      } else {
        message.channel.send("El rol especificado no existe.");
      }
    }
  });
};

module.exports = {
  ConnectDiscord,
  ListRoles,
  ListRolesUndefined,
};

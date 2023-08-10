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
        }
      });
    }
  });
};

module.exports = {
  ConnectDiscord,
  ListRoles,
};

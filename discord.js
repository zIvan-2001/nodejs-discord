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

const ListRolesUndefined = () => {
  const rolId = "1139355839669473321";
  client.on("messageCreate", async (message) => {
    if (message.content === "!kick") {
      const role = message.guild.roles.cache.get(rolId);
      if (role) {
        //Obtener tag de un usuario
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

const test = () => {
  client.on("messageCreate", async (message) => {
    if (message.content === "!miem") {
      const usersId = await User.find();
      const roleId = "1139355839669473321";

      usersId.forEach(async (user) => {
        const member = await message.guild.members.fetch(user.idUser);

        if (!member) {
          return message.channel.send(
            `No se encontró un miembro con ID "${user.idUser}" en el servidor.`
          );
        }

        const role = message.guild.roles.cache.get(roleId);
        console.log(role);

        if (!role) {
          return message.channel.send(
            `No se encontró un rol con ID "${roleId}" en el servidor.`
          );
        }

        const membersWithSameRole = role.members.filter(
          (m) => m.id !== user.idUser
        );

        console.log(membersWithSameRole);

        if (membersWithSameRole.size > 0) {
          const memberTags = membersWithSameRole
            .map((m) => m.user.tag)
            .join(", ");
          message.channel.send(`Tag: ${memberTags}\n ${user.nickMc}`);
        } else {
          message.channel.send(`Todos con miembro`);
        }
      });
    }
  });
};

/* const test2 = () => {
  client.on("messageCreate", async (message) => {
    if (message.content === "123") {
      try {
        const usersId = await User.find();
        const roleId = "1139355839669473321";

        const role = message.guild.roles.cache.get(roleId);
        if (!role) {
          return message.channel.send(
            `No se encontró un rol con ID "${roleId}" en el servidor.`
          );
        }

        const memberPromises = usersId.map((user) => user.idUser);

        memberPromises.forEach((id) => {
          const member = message.guild.members.cache.get(id);
          const roles = member.roles.cache.filter(
            (role) => role.name !== "@everyone"
          );

          roles.forEach((rol) => {
            console.log(rol.name);
          });
        });

        console.log(memberPromises);
      } catch (error) {
        console.error(error);
      }
    }
  });
}; */

const test2 = () => {
  client.on("messageCreate", async (message) => {
    if (message.content.startsWith("789")) {
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
  ListRolesUndefined,
  test,
  test2,
};

const BaseEvent = require("../utils/structures/BaseEvent");
const parsePhoneNumber = require("libphonenumber-js");
const moment = require("moment");
var colors = require("colors");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.body.startsWith('@everyone')) {
      const phoneNumber = parsePhoneNumber(
        `+${message.author
          ? message.author.split("@")[0]
          : message.from.includes("-")
          ? message.from.split("-")[0]
          : message.from.split("@")[0]}`
      );
      const contact = await message.getContact();
      const chat = await message.getChat();
      var isAdmin = false;
      chat.isGroup
        ? isAdmin = chat.participants.filter(
            (member) => member.id.user === message.author.split("@")[0]
          )[0].isAdmin
        : (isAdmin = false);
      const [cmdName, ...cmdArgs] = message.body
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/); 

      const command = client.commands.get('everyone');
      if (command) {
        console.log(
          "📩 " +
            `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[USER] `.bold.magenta +
            `[${message.type.toUpperCase()}] `.bold.green +
            `[${command.name}]`.bold.cyan +
            " Utilizado por: " +
            `${contact.pushname} (${phoneNumber.formatInternational()})`.italic
              .brightBlue +
            (chat.isGroup ? " em: " + `${chat.name}`.bold.red : "")
        );
        command.run(client, message, cmdArgs, contact, chat, isAdmin);
      }
    }
  }
};

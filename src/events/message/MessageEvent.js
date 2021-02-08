const BaseEvent = require("../../utils/structures/BaseEvent");
const moment = require("moment");
var colors = require("colors");

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super("message");
  }

  async run(client, message) {
    if (message.body.startsWith(client.prefix)) {
      const contact = await message.getContact();
      const chat = await message.getChat();
      const [cmdName, ...cmdArgs] = message.body
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName.toLowerCase());
      if (command) {
        console.log(
          `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[${command.name}]`.bold.underline.green +
            " Utilizado por: " +
            `${contact.pushname}`.bold.italic.brightBlue +
            (chat.isGroup ? " em: " + `${chat.name}`.bold.red : "")
        );
        command.run(client, message, cmdArgs, contact, chat);
      }
    }
  }
};

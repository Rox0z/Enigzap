const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class EveryoneCommand extends BaseCommand {
  constructor() {
    super("Everyone", "util", ["everyone", "here"]);
  }

  async run(client, message, args, contact, chat, isAdmin) {
    if (isAdmin) {
      var mentions = [];
      for (let member of chat.participants) {
        if (!member.isMe) {
          const contact = await client.getContactById(member.id._serialized);

          mentions.push(contact);
        }
      }
      chat.sendMessage("Marcando todos os membros", { mentions });
    }
  }
};

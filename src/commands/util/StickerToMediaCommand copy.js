const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class StickerToMediaCommand extends BaseCommand {
  constructor() {
    super("StickerToMedia", "util", ["toimg", "img", "imagem"]);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasQuotedMsg) {
      const msg = await message
        .getQuotedMessage()
        .catch((err) => message.reply("Ocorreu um erro!"));
      if (msg.hasMedia && msg.type == "sticker") {
        img = await msg
          .downloadMedia()
          .catch((err) => message.reply("Ocorreu um erro!"));
        await message.reply(img, chat.id._serialized);
      }
    }
  }
};

const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class MediaToStickerCommand extends BaseCommand {
  constructor() {
    super("MediaToSticker", "util", ["s", "sticker"]);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasMedia) {
      img = await message
        .downloadMedia()
        .catch((err) => message.reply("Ocorreu um erro!"));
      await message.reply(img, chat.id._serialized, {
        sendMediaAsSticker: true,
      });
    } else if (message.hasQuotedMsg) {
      const msg = await message
        .getQuotedMessage()
        .catch((err) => message.reply("Ocorreu um erro!"));
      if (msg.hasMedia) {
        img = await msg
          .downloadMedia()
          .catch((err) => message.reply("Ocorreu um erro!"));
        await message.reply(img, chat.id._serialized, {
          sendMediaAsSticker: true,
        });
      } else {
        await message.reply("Mensagem sem mídia!");
      }
    } else {
      await message.reply("Mensagem sem mídia!");
    }
  }
};

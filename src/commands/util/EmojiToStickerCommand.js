const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const imageToBase64 = require("image-to-base64");
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();

module.exports = class EmojiToStickerCommand extends BaseCommand {
  constructor() {
    super("EmojiToSticker", "util", ["emj", "emoji"]);
  }

  async run(client, message, args, contact, chat) {
    if (!args[0]) {
      message.reply("você precisa usar junto de um emoji! exemplo +emoji 🌎");
    } else if (args[0]) {
      let img = await emoji.get(args[0]);

      if (img.emoji != null) {
        var buff64 = await imageToBase64(img.images[4].url);
        const data = new MessageMedia("image/png", buff64);
        message.reply(data, chat.id._serialized, {
          sendMediaAsSticker: true,
          stickerAuthor: "Demon BOT",
          stickerName: args[0]+" Feito por",
        });
      }
    }
  }
};

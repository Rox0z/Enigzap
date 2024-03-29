const BaseCommand = require("../../utils/structures/BaseCommand");
const moment = require("moment");
var colors = require("colors");

module.exports = class MediaToStickerCommand extends BaseCommand {
  constructor() {
    super("MediaToSticker", "util", ["s", "sticker"]);
  }

  async run(client, message, args, contact, chat) {
    var name = args.join(" ");
    var author = "Demon BOT";
    var img;
    if (message.hasMedia) {
      img = await message.downloadMedia().catch((err) => {
        message.reply("Ocorreu um erro!");
        console.log(
          "📟 " +
            `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[SYSTEM] `.bold.magenta +
            `[CONSOLE] `.bold.green +
            "MÍDIA NÃO OBTIDA".bold.red
        );
      });
    } else if (message.hasQuotedMsg) {
      const msg = await message.getQuotedMessage().catch((err) => {
        message.reply("Ocorreu um erro!");
        console.log(
          "📟 " +
            `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[SYSTEM] `.bold.magenta +
            `[CONSOLE] `.bold.green +
            "MÍDIA NÃO OBTIDA".bold.red
        );
      });
      if (msg.hasMedia) {
        img = await msg.downloadMedia().catch((err) => {
          message.reply("Ocorreu um erro!");
          console.log(
            "📟 " +
              `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
              `[SYSTEM] `.bold.magenta +
              `[CONSOLE] `.bold.green +
              "MÍDIA NÃO OBTIDA".bold.red
          );
        });
      } else {
        await message.reply("Mensagem sem mídia!");
        console.log(
          "📟 " +
            `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[SYSTEM] `.bold.magenta +
            `[CONSOLE] `.bold.green +
            "MÍDIA NÃO ENCONTRADA".bold.red
        );
      }
    } else {
      await message.reply("Mensagem sem mídia!");
      console.log(
        "📟 " +
          `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
          `[SYSTEM] `.bold.magenta +
          `[CONSOLE] `.bold.green +
          "MÍDIA NÃO ENCONTRADA".bold.red
      );
    }
    if (img) {
      await message.reply(img, chat.id._serialized, {
        sendMediaAsSticker: true,
        stickerAuthor: author,
        stickerName: name || "Feito por",
      });
    }
  }
};

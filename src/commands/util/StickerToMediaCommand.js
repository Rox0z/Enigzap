const BaseCommand = require("../../utils/structures/BaseCommand");
const moment = require("moment");
var colors = require("colors");

module.exports = class StickerToMediaCommand extends BaseCommand {
  constructor() {
    super("StickerToMedia", "util", ["toimg", "img", "imagem"]);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasQuotedMsg) {
      const msg = await message.getQuotedMessage().catch((err) => {
        message.reply("Ocorreu um erro!");
        console.log(
          "📟 " +
            `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
            `[SYSTEM] `.bold.magenta +
            `[CONSOLE] `.bold.green +
            "MENSAGEM NÃO OBTIDA".bold.red
        );
      });
      if (msg.hasMedia && msg.type == "sticker") {
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
        if (img) {
          await message.reply(img, chat.id._serialized);
        }
      }
    }
  }
};

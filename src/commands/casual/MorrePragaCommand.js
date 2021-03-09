const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const snekfetch = require("node-superfetch");
const { resolve } = require("path");
const Canvas = require("canvas");
var colors = require("colors");

module.exports = class MorrePragaCommand extends BaseCommand {
  constructor() {
    super("MorrePraga", "casual", ['morrepraga','praga','morre']);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasMedia) {
      img = await message
        .downloadMedia()
        .catch((err) => message.reply("Ocorreu um erro!"));
    } else if (message.hasQuotedMsg) {
      const msg = await message
        .getQuotedMessage()
        .catch((err) => message.reply("Ocorreu um erro!"));
      if (msg.hasMedia) {
        img = await msg
          .downloadMedia()
          .catch((err) => message.reply("Ocorreu um erro!"));
      } else {
        await message.reply("Mensagem sem mídia!");
      }
    } else {
      await message.reply("Mensagem sem mídia!");
    }
    var imgbuff = Buffer.from(img.data, "base64");
    const canvas = Canvas.createCanvas(714, 429);
    const ctx = canvas.getContext("2d");
    const fundo = await Canvas.loadImage(resolve("src/utils/media/praga.png"));
    const praga = await Canvas.loadImage(imgbuff).catch( err => console.log('ERRO AO CARREGAR IMAGEM'.red));
    ctx.drawImage(fundo, 0, 0);
    ctx.drawImage(praga, 78, 130, 190, 190);

    var morrepraga = new MessageMedia(
      "image/png",
      canvas.toBuffer().toString("base64"),
      null
    );
    message.reply(morrepraga);
  }
};

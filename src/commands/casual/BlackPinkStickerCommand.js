const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const { registerFont, createCanvas } = require("canvas");

module.exports = class BlackPinkStickerCommand extends BaseCommand {
  constructor() {
    super("BlackPinkSticker", "casual", ["bps", "bpinks"]);
  }

  async run(client, message, args, contact, chat) {
    if (args.join(' ').length > 11) {
      message.reply('Seu texto possui mais de 11 caracteres!');
    } else {
      registerFont('media/fonts/MyFont-Regular.otf', { family: 'My Font' })
      //-----------Init Canvas-------------
      const canvas = createCanvas(512, 512);
      const ctx = canvas.getContext("2d");
      //-----------Config Text-------------
      var word1 = args.join(' ').toUpperCase();
      ctx.font = `60px My Font`;
      var size = ctx.measureText(word1);
      var padd = 12;
      let actualHeight =
        size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
      ctx.fillStyle = "#f5a7b9";
      ctx.strokeStyle = "#f5a7b9";
      ctx.lineWidth = 8;
      ctx.strokeRect(
        (canvas.width - size.width) / 2 - padd,
        canvas.height / 2 - actualHeight - padd + actualHeight / 2,
        size.width + padd * 2,
        actualHeight + padd * 2
      );
      ctx.fillText(
        word1,
        (canvas.width - size.width) / 2,
        canvas.height / 2 + actualHeight / 2
      );

      const data = new MessageMedia(
        "image/png",
        canvas.toBuffer("image/png").toString("base64")
      );
      setTimeout(() => {
        message.reply(data, chat.id._serialized, {
          sendMediaAsSticker: true,
          stickerAuthor: "Demon BOT",
          stickerName: "Feito por",
        });
      }, 500);
    }
  }
};

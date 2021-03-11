const CanvasTextWrapper = require("canvas-text-wrapper").CanvasTextWrapper;
const BaseCommand = require("../../utils/structures/BaseCommand");
const GIFEncoder = require("gifencoder-forced-color");
const { MessageMedia } = require("whatsapp-web.js");
const Canvas = require("canvas");
const Jimp = require("jimp");
const fs = require("fs");

const webp = require("webp-converter");

module.exports = class RainbowTextCommand extends BaseCommand {
  constructor() {
    super("RainbowText", "casual", ["rbw", "gif"]);
  }

  async run(client, message, args, contact, chat) {
    const fps = 15;
    const texto = args.join(" ");
    if (!args) {
      return message.reply(
        "Você precisa digitar um texto junto do comando para transformar em sticker!"
      );
    } else {
      var i = 0;

      const canvas = Canvas.createCanvas(512, 512);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "red";
      ctx.strokeStyle = "white";

      CanvasTextWrapper(canvas, texto, {
        font: "0px KG Red Hands",
        lineHeight: 1,
        textAlign: "center",
        verticalAlign: "middle",
        paddingX: 0,
        paddingY: 25,
        fitParent: false,
        lineBreak: "auto",
        strokeText: false,
        sizeToFill: true,
        maxFontSizeToFill: 700,
        allowNewLine: true,
        justifyLines: false,
        renderHDPI: true,
        textDecoration: "none",
      });

      var huetext;
      var ctext;

      var text = await Jimp.read(canvas.toBuffer("image/png"));

      const GIF = new GIFEncoder(512, 512);
      await GIF.createReadStream().pipe(
        fs.createWriteStream(`./media/sticker/sticker.gif`)
      );
      GIF.start();
      GIF.setDelay(100);
      GIF.setRepeat(0);
      GIF.setTransparencyMode(0);
      GIF.setTransparent(0x000000);
      while (i < fps) {
        ctx.save();
        huetext = await text
          .color([{ apply: "hue", params: [360 / fps] }])
          .getBufferAsync(Jimp.MIME_PNG);

        ctext = await Canvas.loadImage(huetext);
        ctx.drawImage(ctext, 0, 0);
        GIF.addFrame(ctx);
        i++;
      }
      GIF.finish();

      setTimeout(() => {
        webp
          .gwebp(
            "./media/sticker/sticker.gif",
            "./media/sticker/sticker.webp",
            "-q 80"
          )
          .then(() => {
            message.reply(
              MessageMedia.fromFilePath(`./media/sticker/sticker.webp`),
              chat.id._serialized,
              {
                sendMediaAsSticker: true,
                stickerAuthor: "Demon BOT",
                stickerName: "Feito por",
              }
            );
          });
      }, 1000);
      setTimeout(() => {
        fs.unlinkSync(`./media/sticker/sticker.gif`);
        fs.unlinkSync(`./media/sticker/sticker.webp`);
      }, 10000);
    }
  }
};

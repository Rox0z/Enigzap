const BaseCommand = require("../../utils/structures/BaseCommand");
const GIFEncoder = require("gifencoder-forced-color");
const { MessageMedia } = require("whatsapp-web.js");
const textToImage = require("text-to-image");
const Canvas = require("canvas");
const Jimp = require("jimp");
const fs = require("fs");

const webp = require("webp-converter");

module.exports = class TextToStickerCommand extends BaseCommand {
  constructor() {
    super("TextToSticker", "casual", ["ttp"]);
  }

  async run(client, message, args, contact, chat) {
    const fps = 15
    const texto = args.join(" ");
    if (!args) {
      return message.reply(
        "Você precisa digitar um texto junto do comando para transformar em sticker!"
      );
    } else if (texto.length < 90) {
      textToImage
        .generate(texto, {
          maxWidth: 512,
          fontSize: 64,
          fontFamily: "Alphakind",
          lineHeight: 78,
          margin: 10,
          bgColor: "#00000000",
          textColor: "red",
          textAlign: "center",
        })
        .then(async (dataUri) => {
          var b64img = dataUri.slice("data:image/png;base64,".length);
          var buff = Buffer.from(b64img, "base64");
          var i = 0;

          var text = await Jimp.read(buff);
          const canvas = Canvas.createCanvas(512, 512);
          const ctx = canvas.getContext("2d");
          var huetext;
          var ctext;

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
              .color([{ apply: "hue", params: [360/fps] }])
              .getBufferAsync(Jimp.MIME_PNG);

            ctext = await Canvas.loadImage(huetext);
            ctx.drawImage(ctext, 0, 0);
            GIF.addFrame(ctx);
            i++;
          }
          GIF.finish();

          setTimeout(() => {
            webp.gwebp(
                "./media/sticker/sticker.gif",
                "./media/sticker/sticker.webp",
                "-q 80"
              )
              .then(() => {
                message.reply(
                  MessageMedia.fromFilePath(`./media/sticker/sticker.webp`),
                  chat.id._serialized,
                  { sendMediaAsSticker: true }
                );
              });
          }, 1000);
          setTimeout(() => {
            fs.unlinkSync(`./media/sticker/sticker.gif`);
            fs.unlinkSync(`./media/sticker/sticker.webp`);
          }, 5000);
        });
    } else {
      message.reply("excedeu o tamanho permitido");
    }
  }
};

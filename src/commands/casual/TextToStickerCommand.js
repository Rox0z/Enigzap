const CanvasTextWrapper = require("canvas-text-wrapper").CanvasTextWrapper;
const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const Canvas = require("canvas");

module.exports = class TextToStickerommand extends BaseCommand {
  constructor() {
    super("TextToSticker", "casual", ["ttp"]);
  }

  async run(client, message, args, contact, chat) {
    //-----------Init Canvas-------------
    const canvas = Canvas.createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    //-----------Config Text-------------

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 6.5;

    CanvasTextWrapper(canvas, args.join(" "), {
      font: "0px KG Red Hands",
      lineHeight: 100,
      textAlign: "center",
      verticalAlign: "middle",
      paddingX: 0,
      paddingY: 25,
      fitParent: false,
      lineBreak: "auto",
      strokeText: true,
      sizeToFill: true,
      maxFontSizeToFill: 700,
      allowNewLine: true,
      justifyLines: false,
      renderHDPI: true,
      textDecoration: "none",
    });

    const data = new MessageMedia(
      "image/png",
      canvas.toBuffer('image/png').toString('base64')
    );
    setTimeout(() => {
        message.reply(data, chat.id._serialized, {
            sendMediaAsSticker: true,
            stickerAuthor: "Demon BOT",
            stickerName: "Feito por",
          });
      }, 500);
    
  }
};

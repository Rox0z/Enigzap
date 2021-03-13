const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const { registerFont, createCanvas, loadImage } = require("canvas");

module.exports = class BlackPinkStickerCommand extends BaseCommand {
  constructor() {
    super("Minecraft", "casual", ["mine", "minecraft"]);
  }

  async run(client, message, args, contact, chat) {
    if (args.join(" ").length > 25) {
      message.reply("Seu texto possui mais de 25 caracteres!");
    } else {
      registerFont('media/fonts/Minecraftia-Regular.ttf', { family: 'Minecraftia' })
      //-----------Init Canvas-------------
      const canvas = createCanvas(1408, 256);
      const ctx = canvas.getContext("2d");
      //---------Generate Text-------------
      var fundo = await loadImage("src/utils/media/conquista.png");
      ctx.drawImage(fundo, 0, 0);
      ctx.font = "60px Minecraftia";
      ctx.fillStyle = "#fff";
      ctx.fillText(args.join(" "), 240, 240);

      const data = new MessageMedia(
        "image/png",
        canvas.toBuffer("image/png").toString("base64")
      );
      setTimeout(() => {
        message.reply(data, chat.id._serialized);
      }, 500);
    }
  }
};

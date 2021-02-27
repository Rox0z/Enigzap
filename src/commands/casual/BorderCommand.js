const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const snekfetch = require("node-superfetch");
const { resolve } = require("path");
const Canvas = require("canvas");
const Jimp = require("jimp");
const { existsSync } = require("fs");

module.exports = class BorderCommand extends BaseCommand {
  constructor() {
    super("Border", "casual", ["border"]);
  }

  async run(client, message, args, contact, chat) {
    if (existsSync(resolve(`src/utils/pride/${args[0]}.png`))) {
      const pfp = await contact.getProfilePicUrl();
      const { body: a } = await snekfetch.get(pfp);

      const canvas = Canvas.createCanvas(512, 512);
      const ctx = canvas.getContext("2d");
      var av = await Canvas.loadImage(a);
      const border = await Canvas.loadImage(
        resolve(`src/utils/pride/${args[0]}.png`)
      );

      ctx.drawImage(av, 0, 0, 512, 512);
      const img = await Jimp.read(canvas.toBuffer());
      ctx.restore();

      var out = await img
        .circle({ radius: 256 - 13.46, x: 256, y: 256 })
        .resize(512, 512)
        .getBufferAsync(Jimp.MIME_PNG);

      av = await Canvas.loadImage(out);
      ctx.drawImage(border, -256, -256, 1024, 1024);
      ctx.drawImage(av, 0, 0, 512, 512);

      const data = new MessageMedia(
        "image/png",
        canvas.toBuffer().toString("base64"),
        null
      );

      message.reply(data);
    } else {
      message.reply(
        "você precisa dizer junto te um tema! disponíveis: space, lgbt, lgbt2, agender, bisex, asex, gqueer, nonbinary, pan, trans"
      );
    }
  }
};

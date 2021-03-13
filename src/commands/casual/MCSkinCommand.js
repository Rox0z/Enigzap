const BaseCommand = require("../../utils/structures/BaseCommand");
const { createCanvas, loadImage } = require("canvas");
const { MessageMedia } = require("whatsapp-web.js");
const minecraftPlayer = require("minecraft-player");
const sizeOf = require("image-size");
const moment = require("moment");
var colors = require("colors");

module.exports = class MCSkinCommand extends BaseCommand {
  constructor() {
    super("MCSkin", "", ["mcskin", "skin"]);
  }

  async run(client, message, args, contact, chat) {
    if (!args)
      return message.reply("Você precisa escrever um nome para a pesquisa!");
    const CSize = 512;
    //-----------Init Canvas-------------
    const canvas = createCanvas(CSize, CSize);
    const ctx = canvas.getContext("2d");
    //---------Generate Text-------------
    const player = await minecraftPlayer(args[0]).catch((err) => {
      console.log(
        "📟 " +
          `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
          `[SYSTEM] `.bold.magenta +
          `[CONSOLE] `.bold.green +
          "USER NÃO ENCONTRADO".bold.red
      );
      message.reply("Não foi possivel encontrar o usuário");
    });
    if (!player) return;
    var skin = await loadImage(player.textures.skin.url);
    var size = sizeOf(Buffer.from(player.textures.skin.data, "base64"));
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      skin,
      -CSize,
      -CSize,
      size.width * (CSize / 8),
      size.height * (CSize / 8)
    );

    ctx.drawImage(
      skin,
      -CSize * 5,
      -CSize,
      size.width * (CSize / 8),
      size.height * (CSize / 8)
    );

    const data = new MessageMedia(
      "image/png",
      canvas.toBuffer("image/png").toString("base64")
    );
    setTimeout(() => {
      message.reply(data, chat.id._serialized, {
        caption: `Usuário: ${player.username}`,
      });
    }, 500);
  }
};

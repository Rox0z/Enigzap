const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const { createCanvas } = require("canvas");

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

module.exports = class PHubStickerCommand extends BaseCommand {
  constructor() {
    super("PHubSticker", "casual", ["phubs", "phs"]);
  }

  async run(client, message, args, contact, chat) {
    var texto = args.join(" ").split("|");

    //-----------Init Canvas-------------
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext("2d");
    //---------Generate Text-------------
    var word1 = toTitleCase(texto[0]+"  ");
    var word2 = texto[1].toLowerCase();
    var gsize = 50;
    ctx.font = `700 ${gsize}px Arial`;
    var size = ctx.measureText(word1 + word2);
    var size1 = ctx.measureText(word1);
    var size2 = ctx.measureText(word2);
    var padd = gsize * 0.4;
    let height1 =
      size1.actualBoundingBoxAscent + size1.actualBoundingBoxDescent;
    let height2 =
      size2.actualBoundingBoxAscent + size2.actualBoundingBoxDescent;
    ctx.fillStyle = "#f90";
    roundRect(
      ctx,
      (canvas.width - size.width) / 2 - padd / 2 + size1.width,
      canvas.height / 2 - height1 - padd + height1 / 2,
      size2.width + padd,
      height2 + padd * 2,
      gsize * 0.2,
      true,
      false
    );
    ctx.fillStyle = "#fff";
    ctx.fillText(
      word1,
      (canvas.width - size.width) / 2,
      canvas.height / 2 + height1 / 2
    );
    ctx.fillStyle = "#000";
    ctx.fillText(
      word2,
      (canvas.width - size.width) / 2 + size1.width,
      canvas.height / 2 + height1 / 2
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
};

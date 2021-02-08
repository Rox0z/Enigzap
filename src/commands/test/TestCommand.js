const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const snekfetch = require("node-superfetch");
const photo2anime = require("photo2anime");
const { resolve } = require("path");
const Canvas = require("canvas");
const moment = require("moment");
const Jimp = require("jimp");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("Teste", "test", ["test", "teste", "t"]);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasMedia) {
      img = await message.downloadMedia();
    } else if (message.hasQuotedMsg) {
      const msg = await message.getQuotedMessage();
      if (msg.hasMedia) {
        img = await msg.downloadMedia();
      }
    }

    message.reply(img, chat.id._serialized, { sendMediaAsSticker: true });
  }
};

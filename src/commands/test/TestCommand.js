const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const imageToBase64 = require("image-to-base64");
const webpInfo = require("animated-webp-info");
const snekfetch = require("node-superfetch");
const photo2anime = require("photo2anime");
const { EmojiAPI } = require("emoji-api");
const sizeOf = require("image-size");
const { resolve } = require("path");
const Canvas = require("canvas");
const moment = require("moment");
const Jimp = require("jimp");
const emoji = new EmojiAPI();

const log = console.log;

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("Teste", "test", ["test", "teste", "t"]);
  }

  async run(client, message, args, contact, chat) {
    
  }
};

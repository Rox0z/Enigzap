const BaseCommand = require("../../utils/structures/BaseCommand");
const toArray = require("stream-to-array");
const YouTube = require("youtube-sr").default;
const youtubedl = require("youtube-dl");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = class YtdlCommand extends BaseCommand {
  constructor() {
    super("YoutubeDownload", "util", ["ytdl"]);
  }

  async run(client, message, args, contact, chat) {
    var isURL = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    const URL = isURL.test(args[0]);
    if (!URL) {
      YouTube.search(args.join(" "), { limit: 1 })
        .then(async (video) => {
          const url = `http://www.youtube.com/watch?v=${video[0].id}`;

          const dl = youtubedl(url, ["--format=18"]);
          //console.log(dl)
          const buffer = Buffer.concat(await toArray(dl));

          const data = new MessageMedia("video/mp4", buffer.toString("base64"));
          setTimeout(() => {
            youtubedl.getInfo(url, (err, info) => {
              client.sendMessage(chat.id._serialized, data, {
                caption: `${info.title}\n\n${`\u200B`.repeat(4000)}\n${info.description}`
              });
            });
          }, 10000);
        })
        .catch(console.error);
    } else if (URL){
      const url = args[0];

          const dl = youtubedl(url, ["--format=18"]);
          //console.log(dl)
          const buffer = Buffer.concat(await toArray(dl));

          const data = new MessageMedia("video/mp4", buffer.toString("base64"));
          setTimeout(() => {
            youtubedl.getInfo(url, (err, info) => {
              client.sendMessage(chat.id._serialized, data, {
                caption: `${info.title}\n\n${`\u200B`.repeat(4000)}\n${info.description}`,
                sendMediaAsSticker: false,
              });
            });
          }, 10000);
    } else {
      message.reply(`Você precisa providenciar uma pesquisa de video ou link!`)
    }
  }
};
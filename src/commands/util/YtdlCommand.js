const BaseCommand = require("../../utils/structures/BaseCommand");
const toArray = require("stream-to-array");
const YouTube = require("youtube-sr").default;
const youtubedl = require("youtube-dl");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = class YtdlCommand extends BaseCommand {
  constructor() {
    super("YoutubeDownload", "util", ["ytdl"]);
  }

  async run(client, message, args) {
    YouTube.search(args.join(" "), { limit: 1 })
      .then(async (video) => {
        const url = `http://www.youtube.com/watch?v=${video[0].id}`;

        const dl = youtubedl(url, ["--format=18"]);
        console.log(dl)
        const buffer = Buffer.concat(await toArray(dl));

        const data = new MessageMedia("video/mp4", buffer.toString("base64"));
        setTimeout(()=>{
          youtubedl.getInfo(url, (err, info) => {
            message.reply(data, {
              caption: `${info.title}\n\n${info.description}`,
              sendMediaAsSticker: true
            });
          });
        },10000)
        
      })
      .catch(console.error);
  }
};

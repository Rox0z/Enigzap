const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const photo2anime = require("photo2anime");

module.exports = class AnimeCommand extends BaseCommand {
  constructor() {
    super("Anime", "casual", ["anime"]);
  }

  async run(client, message, args, contact, chat) {
    var img;
    if (message.hasMedia) {
      img = await message
        .downloadMedia()
        .catch((err) => message.reply("Ocorreu um erro!"));
    } else if (message.hasQuotedMsg) {
      const msg = await message
        .getQuotedMessage()
        .catch((err) => message.reply("Ocorreu um erro!"));
      if (msg.hasMedia) {
        img = await msg
          .downloadMedia()
          .catch((err) => message.reply("Ocorreu um erro!"));
      } else {
        img = await contact
          .getProfilePicUrl()
          .catch((err) => message.reply("Ocorreu um erro!"));
      }
    } else {
      img = await contact
        .getProfilePicUrl()
        .catch((err) => message.reply("Ocorreu um erro!"));
    }
    const anime = new photo2anime();
    message.reply("Processando...");
    anime.on("ready", () => {
      anime
        .transform({ photo: img.data })
        .then((image) => {
          const data = new MessageMedia("image/png", image);

          message.reply(data);
        })
        .catch((err) => {
          console.log(err);
          message.reply("Um erro ocorreu ao processar a imagem!");
        });
    });
  }
};

const BaseCommand = require("../../utils/structures/BaseCommand");
const langInPT = new Intl.DisplayNames(["pt"], { type: "language" });
const translate = require("@iamtraction/google-translate");
const googleTTS = require("google-tts-api");
const { MessageMedia } = require("whatsapp-web.js");
var colors = require("colors");

module.exports = class TranslateToSpeechCommand extends BaseCommand {
  constructor() {
    super("TranslateToSpeech", "casual", ["gts", "gtsay"]);
  }

  run(client, message, args, contact, chat) {
    var lang = args[0];
    if (lang.includes("-")) {
      lang = lang.split("-");
      lang[0] = lang[0].toLowerCase();
      lang[1] = lang[1].toUpperCase();
      lang = lang.join("-");
    }
    translate(args.slice(1).join(" "), { to: lang })
      .then((res) => {
        message.reply(
          `Texto traduzido de: ${langInPT.of(
            res.from.language.iso
          )} => ${langInPT.of(args[0])}:\n\n` + `"${res.text}"`
        );
        googleTTS
          .getAudioBase64(res.text, {
            lang: lang,
            slow: false,
            host: "https://translate.google.com",
            timeout: 10000,
          })
          .then((b64) => {
            const audio = new MessageMedia("audio/mpeg", b64);
            client.sendMessage(chat.id._serialized, audio, {
              sendAudioAsVoice: true,
            });
          })
          .catch((err) => console.log("ERRO AO GERAR VOZ".red));
      })
      .catch((err) => {
        message.reply("Um erro ocorreu ao traduzir o texto!");
        console.log("ERRO AO TRADUZIR".red);
      });
  }
};

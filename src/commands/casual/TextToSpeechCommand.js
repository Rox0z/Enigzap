const BaseCommand = require("../../utils/structures/BaseCommand");
const googleTTS = require("google-tts-api");
const { MessageMedia } = require("whatsapp-web.js");

module.exports = class TextToSpeechCommand extends BaseCommand {
  constructor() {
    super("TextToSpeech", "casual", ['tts', 'say', 'falar']);
  }

  run(client, message, args, contact, chat) {
    googleTTS
      .getAudioBase64(args.join(' '), {
        lang: "pt",
        slow: false,
        host: "https://translate.google.com",
        timeout: 10000,
      })
      .then((b64) => {
        const audio = new MessageMedia("audio/mpeg", b64);
        message.reply(audio, chat.id._serialized, { sendAudioAsVoice: true });
      })
      .catch(console.error);
  }
};

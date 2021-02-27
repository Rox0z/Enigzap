const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class TextImageCommand extends BaseCommand {
  constructor() {
    super("Menu", "casual", ["menu", "help"]);
  }

  async run(client, message, args, contact, chat) {
    client.sendMessage(
      chat.id._serialized,`
╔═══Enigzap═════
║ Prefixo: +
║
║ Comandos Casuais:
║ 
║ +anime (mande junto da imagem, respondendo ou sozinho)
║ +border space (também pode ser: lgbt, lgbt2, agender, bisex, asex, gqueer, nonbinary, pan, trans)
║ +ttp texto para virar sticker
║
║ Comandos Úteis:
║
║ +emoji 🌎 (qualquer emoji)
║ +s (mande junto da imagem ou respondendo)
║ +status (verifica o status do bot)
║ +img (responda a um sticker)
║ +gt en (en, pt, ru etc.) texto a ser traduzido
║
╚═════════════`
    );
    
  }
};

const BaseCommand = require('../../utils/structures/BaseCommand');
const langInPT = new Intl.DisplayNames(['pt'], { type: 'language' });
const translate = require('@iamtraction/google-translate');

module.exports = class TranslateCommand extends BaseCommand {
  constructor() {
    super('Translate', 'util', ['traduzir','translate','gt']);
  }

  run(client, message, args) {
    translate(args.slice(1).join(' '), { to: args[0] }).then(res => {
      message.reply(`Texto traduzido de: ${langInPT.of(res.from.language.iso)} =>\n\n`+`"${res.text}"`)
    }).catch(err => {
      message.reply("Um erro ocorreu ao traduzir o texto!");
      console.log(err);
    });
  }
}
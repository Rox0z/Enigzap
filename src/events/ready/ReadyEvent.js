const BaseEvent = require('../../utils/structures/BaseEvent');
const CFonts = require("cfonts");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const prettyFont = CFonts.render(`Cliente iniciado!|WWeb: v${await client.getWWebVersion()}`, {
      font: "console",
      colors: ["greenBright"],
      align: "center",
      lineHeight: 1,
    });
    console.log(prettyFont.string);
  }
}
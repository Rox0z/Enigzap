const BaseEvent = require("../../utils/structures/BaseEvent");
const moment = require("moment");
const CFonts = require("cfonts");
var colors = require("colors");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client) {
    const prettyFont = CFonts.render(
      `Cliente iniciado!|WWeb: v${await client.getWWebVersion()}`,
      {
        font: "console",
        colors: ["greenBright"],
        align: "center",
        lineHeight: 1,
      }
    );
    console.log(prettyFont.string);
    var array = Array.from(client.commands, ([name, value]) => ({
      name,
      value,
    }));
    var cmds = array.map((command) => client.commands.get(command.name));

    var tabl = cmds.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => t.place === thing.place && t.name === thing.name)
    );
    console.table(tabl);
    console.log(
      "\n\n" +
        "📟 " +
        `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
        `[SYSTEM] `.bold.magenta +
        `[CONSOLE] `.bold.green +
        "O SISTEMA FOI INICIADO"
    );
  }
};

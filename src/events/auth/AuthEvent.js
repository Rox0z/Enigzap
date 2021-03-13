const BaseEvent = require("../../utils/structures/BaseEvent");
const CFonts = require("cfonts");

module.exports = class AuthEvent extends BaseEvent {
  constructor() {
    super("authenticated");
  }

  async run(client, session) {
    const prettyFont = CFonts.render("Demon BOT", {
      font: "3d",
      //colors: ["greenBright", "black"],
      align: "center",
      lineHeight: 1,
      gradient: ["#00f","#33f"],
    });
    console.log(prettyFont.string);
  }
};

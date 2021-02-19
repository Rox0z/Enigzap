const BaseEvent = require("../utils/structures/BaseEvent");
const { resolve } = require('path')
const moment = require("moment");
var colors = require("colors");
const fs = require("fs");

module.exports = class AuthFailEvent extends BaseEvent {
  constructor() {
    super("auth_failure");
  }

  async run(client) {
    fs.unlinkSync(resolve('session.json'));
    console.log(
      "📟 " +
        `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
        `[SYSTEM] `.bold.magenta +
        `[CONSOLE] `.bold.green +
        "AUTENTICAÇÃO FALHOU!".bold.red
    );
  }
};

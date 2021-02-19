const BaseEvent = require('../utils/structures/BaseEvent');
const moment = require("moment");
var colors = require("colors");


module.exports = class DisconnectedEvent extends BaseEvent {
  constructor() {
    super('disconnected');
  }
  
  async run(client) {
    console.log(
        "📟 " +
        `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
        `[SYSTEM] `.bold.magenta +
        `[CONSOLE] `.bold.green +
        "O SISTEMA FOI DESCONECTADO"
    );
  }
}
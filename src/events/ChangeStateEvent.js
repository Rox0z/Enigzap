const BaseEvent = require('../utils/structures/BaseEvent');
const moment = require("moment");
var colors = require("colors");

module.exports = class ChangeStateEvent extends BaseEvent {
  constructor() {
    super('change_state');
  }
  
  async run(client, state) {
    console.log(
      "📟 " +
        `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
        `[SYSTEM] `.bold.magenta +
        `[CONSOLE] `.bold.green +
        "ESTADO DO SISTEMA ALTERADO PARA "+
        `[${state}]`.bold.red
    );
  }
}
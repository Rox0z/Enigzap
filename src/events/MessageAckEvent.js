const BaseEvent = require("../utils/structures/BaseEvent");
const parsePhoneNumber = require("libphonenumber-js");
const moment = require("moment");
var colors = require("colors");

module.exports = class MessageAckEvent extends BaseEvent {
  constructor() {
    super("message_ack");
  }

  async run(client, message, ack) {
    if (ack == 1) {
      const phoneNumber = parsePhoneNumber(
        `+${
          message.to.includes("-")
            ? message.to.split("-")[0]
            : message.to.split("@")[0]
        }`
      );
      console.log(
        "📨 " +
          `[ ${moment().format("DD/M/YYYY  HH:mm:ss")} ] `.bold.yellow +
          `[SYSTEM] `.bold.magenta +
          `[${message.type.toUpperCase()}] `.bold.green +
          "[ENVIADO] ".bold.red +
          `Mensagem enviada para: ` +
          `${phoneNumber.formatInternational()}`.italic.blue
      );
    }
  }
};

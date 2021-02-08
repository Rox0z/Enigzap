const BaseCommand = require("../../utils/structures/BaseCommand");
const moment = require("moment");

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super("Status", "util", ["status", "ping"]);
  }

  async run(client, message, args, contact, chat) {
    const batt = await client.info.getBatteryStatus();

    client.sendMessage(
      chat.id._serialized,
`╔═══Enigzap═════
║ *Bateria*:  ${batt.battery}%
║ *Carregando*:  ${batt.plugged ? "Sim" : "Não"}
║ *Ping*:  ${processTime(message.timestamp, moment())}s
║ *WWeb*:  v${await client.getWWebVersion()}
╚═════════════`
    );
  }
};

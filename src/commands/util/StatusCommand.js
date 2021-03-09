const BaseCommand = require("../../utils/structures/BaseCommand");
const si = require(`systeminformation`);
const OSname = require(`os-name`);
const moment = require("moment");
const os = require(`os`);

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super("Status", "util", ["status", "ping"]);
  }

  async run(client, message, args, contact, chat) {
    const batt = await client.info.getBatteryStatus();
    var graphic = await si.graphics()
    graphic = graphic.controllers[0]

    client.sendMessage(
      chat.id._serialized,
      `╔═══Enigzap═════
║ *Bateria*:  ${batt.battery}%
║ *Carregando*:  ${batt.plugged ? "Sim" : "Não"}
║ *Ping*:  ${processTime(message.timestamp, moment())}s
║ *WWeb*:  v${await client.getWWebVersion()}
╠═════════════
║ *OS*:  ${OSname()} (${os.type()})
║ *Memória*:  ${bytesToSize(os.freemem())} / ${bytesToSize(os.totalmem())}
║ *CPU*:  ${os.cpus()[0].model.split('CPU')[0]}
║ *Gráfico*:  ${graphic.model + " " + graphic.vram + " MB"}
╚═════════════`
    );
  }
};

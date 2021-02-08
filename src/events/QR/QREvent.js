const BaseEvent = require('../../utils/structures/BaseEvent');
const qrcode = require('qrcode-terminal');

module.exports = class QREvent extends BaseEvent {
  constructor() {
    super('qr');
  }
  async run (client, qr) {
    console.log('QR CODE');
    qrcode.generate(qr, {small: true})
  }
}
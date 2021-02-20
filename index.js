const { registerCommands, registerEvents } = require("./src/utils/registry");
const { Client } = require("whatsapp-web.js");
const moment = require("moment");
var colors = require("colors");
require("dotenv").config();
const fs = require("fs");

const SESSION_FILE_PATH = "./session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({
  session: sessionCfg,
  puppeteer: { headless: true, args: ["--no-sandbox", "--disable-gpu"] },
});

(async () => {
  client.auth = sessionCfg;
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.PREFIX;
  await registerCommands(client, "../../src/commands");
  await registerEvents(client, "../../src/events");
  await client.initialize();
})();

client.on("authenticated", (session) => {
  sessionCfg = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
    if (err) {
      console.error(err);
    }
  });
});

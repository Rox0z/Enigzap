const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageMedia } = require("whatsapp-web.js");
const imageToBase64 = require("image-to-base64");
const snekfetch = require("node-superfetch");
const puppeteer = require("puppeteer");

module.exports = class TextImageCommand extends BaseCommand {
  constructor() {
    super("TextImage", "casual", ["text"]);
  }

  async run(client, message, args, contact, chat) {
    const options = {
      headless: true,
      defaultViewport: null,
      args: [
          "--incognito",
          "--no-sandbox",
          "--single-process",
          "--no-zygote"
      ],
  };
    const url =
      "https://textpro.me/create-blackpink-logo-style-online-1001.html";
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

    await page.$eval("input#text-0.form-control", (el) => (el.value = "ENIGZAP-BOT"));
    await page.$eval("input#submit.btn.btn-primary.submit-button2", (el) =>
      el.click()
    );
    await page
      .waitForNavigation({ waitUntil: "networkidle2", timeout: 0 })
      .then(async () => {
        var imgurl = await page.evaluate(() => {
          const img = document.querySelector(
            "div.thumbnail > img",
            (img) => img
          );
          return img.currentSrc;
        });
        var buff64 = await imageToBase64(imgurl).catch((err) => message.reply("Ocorreu um erro!"));
        const data = new MessageMedia("image/jpg", buff64)
        //const data = new MessageMedia("image/png", a.toString("base64"));
        await message.reply(imgurl, chat.id._serialized);
      });
    await browser.close();
  }
};

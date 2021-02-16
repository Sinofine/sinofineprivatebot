const { Telegraf } = require("telegraf");
const {readFileSync, writeFileSync} = require("fs");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
let s = JSON.parse(readFileSync("stickerSets.json",{encoding:"utf-8"}));
async function getStickerSet(name){
    writeFileSync("stickerSets.json",JSON.stringify({[name]: await bot.telegram.getStickerSet(name),...s}));
}
getStickerSet("placeholder");
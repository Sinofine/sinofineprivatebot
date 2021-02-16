const { Telegraf } = require("telegraf");
require("dotenv").config();
const { readFileSync } = require("fs");
const replyStickers = JSON.parse(readFileSync("stickerSets.json", { encoding: "utf-8" }));
let allStickers = [], allStickersArray = [], temp = {};
for (let name of Object.keys(replyStickers)) {
    allStickersArray.push(replyStickers[name].stickers.map(_ => _.file_id));
}
allStickers = allStickers.concat(...allStickersArray);
allStickersArray = undefined;
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply("🥴"));
bot.on("sticker", ctx => {
    if (ctx.channelPost) return;
    ctx.replyWithSticker(randomPick(allStickers));
});
[
    ["fufu", "foxreactions"],
    ["mafumafu", "LINE_Mafumafu_cat_Sticker", "Mafumafu_cat_by_cocopry"],
    ["mafuteru", "BozuPack"],
    ["neko", "WhiteKitten03", "WhiteKitten04", "TigerKitten2", "TigerKitten3", "TigerKitten4"],
    ["luo", "luoxiang"]
].map((arr) => commander(...arr));

bot.on("message", ctx => {
    if (ctx.message.chat.id !== -1001309515017) return; // only affects my group;
    if (ctx.message.new_chat_members) {
        for (let member of ctx.message.new_chat_members) {
            ctx.kickChatMember(member.id).then(() => ctx.unbanChatMember(member.id, { only_if_banned: true }));
        }
        ctx.deleteMessage(ctx.message.message_id);
    }
    if (ctx.message.left_chat_member) {
        ctx.deleteMessage(ctx.message.message_id);
    }
})
bot.on("channel_post", ctx => {
    if (ctx.channelPost.chat.id !== -1001305257538) return; // channel
    ctx.forwardMessage(-1001296341334, { disable_notification: true });
});
bot.telegram.setWebhook("https://awsl/awsl2");
bot.launch({
    webhook: {
        hookPath: "/awsl2",
        port: 32768
    }
})
//bot.startWebhook("/awsl2",null,32768);
function randomInt(start, end) {
    return Math.round(Math.random() * (end - start)) + start;
}
function randomPick(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
function commander(commandName, ...stickerNames) {
    temp[commandName] = [].concat(...(stickerNames.map(_ => replyStickers[_].stickers))).map(_ => _.file_id);
    bot.command(commandName, ctx => {
        ctx.replyWithSticker(randomPick(temp[commandName]));
    });
}
const express = require("express");
const expressApp = express();
const { exec } = require("child_process");
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.bot_token);

expressApp.get("/", (req, res) => {
  console.log("dnfsdjk");
  res.sendFile(path.join(__dirname + "/index.html"));
});

expressApp.listen(port, () => {
  console.log("dnfsdjk");
});

bot.launch();

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.command("ethereum", (ctx) => {
  

  let command = ctx.update.message.text
  let limit =command.length
  console.log("🚀 ~ file: app2.js:42 ~ bot.command ~ command:", command.slice(9,limit))
  command =  command.slice(9,limit)
  var rate;
  console.log(ctx.from);
  if(command){

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
    )
    .then((response) => {
      console.log(response.data);
      rate = response.data.ethereum;
      const message = `Hello, today the ethereum price is ${rate.usd}USD`;
      bot.telegram.sendMessage(ctx.chat.id, message, {});
    });
});

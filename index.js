require("dotenv").config();
const { Client } = require("discord.js");
const client = new Client();

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

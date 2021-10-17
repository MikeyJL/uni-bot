require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { APIVersion, deployAPI } = require("./src/deploy-commands");

deployAPI();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction: any) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "ping":
            await interaction.reply("Pong");
            break;
        case "server":
            await interaction.reply("Server");
            break;
        case "user":
            await interaction.reply("User");
            break;
        case "deploy":
            deployAPI();
            await interaction.reply(`Deployed API@v${APIVersion}`);
            break;
    }
});

client.login(process.env.CLIENT_TOKEN);

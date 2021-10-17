require("dotenv").config();
const { Client, Intents } = require("discord.js");

const { deployAPI } = require("./src/deploy-commands");
const APIVersion = "1.0.0";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

deployAPI();
client.once("ready", () => {
    console.log("Ready!");
});

client.on("interactionCreate", async (interaction: any) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case "help":
            await interaction.reply(
                "Hi, I'm UniBot, please let Mikey (borgir) know if you have any ideas for improving me!\n\nList of commands: /help, /version"
            );
            break;
        case "version":
            await interaction.reply(`API@v${APIVersion}`);
            break;
    }
});

client.login(process.env.CLIENT_TOKEN);

require("dotenv").config();
const request = require("request");
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
                "Hi, I'm UniBot, please let Mikey (borgir#5796) know if you have any ideas for improving me!\n\nList of commands: /help, /version, /addict"
            );
            break;
        case "version":
            await interaction.reply(`API@${APIVersion}`);
            break;
        case "addict":
            const request = require("request");
            request(
                "https://www.codewars.com/api/v1/users/hexolio",
                { json: true },
                (error: Error, response: Response, body: any) => {
                    if (error) {
                        return interaction(error.message);
                    }
                    const honor: number = body.honor;
                    const skills: string[] = body.skills;
                    interaction.reply(
                        `Darius has ${honor} points and knows ${skills.join(
                            ", "
                        )}`
                    );
                }
            );
            break;
    }
});

client.login(process.env.CLIENT_TOKEN);

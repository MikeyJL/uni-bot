import { AxiosResponse, ResponseType } from "axios";
import { ICodewars } from "./types";

require("dotenv").config();
const axios = require("axios");
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
            axios
                .get("https://www.codewars.com/api/v1/users/hexolio")
                .then((response: AxiosResponse<ICodewars>) => {
                    const honor: number = response.data.honor;
                    const skills: string[] = response.data.skills;
                    interaction.reply(
                        `Darius has ${honor} points on Codewars.`
                    );
                })
                .catch((error: Error) => {
                    interaction.reply(
                        `Something went wrong\n${error.name}\n${error.message}`
                    );
                });
            break;
    }
});

client.login(process.env.CLIENT_TOKEN);

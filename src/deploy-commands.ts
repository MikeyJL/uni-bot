require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
    new SlashCommandBuilder().setName("help").setDescription("Need help?"),
    new SlashCommandBuilder()
        .setName("version")
        .setDescription("Displays the version of the API."),
    new SlashCommandBuilder()
        .setName("addict")
        .setDescription(
            "Find out what our local CodeWars addict Darius has been up to..."
        ),
].map((command) => command.toJSON());

export const deployAPI = () => {
    const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);
    rest.put(
        Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
        ),
        {
            body: commands,
        }
    )
        .then(() =>
            console.log("Successfully registered application commands.")
        )
        .catch(console.error);
};

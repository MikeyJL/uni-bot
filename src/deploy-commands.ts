require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
    new SlashCommandBuilder()
        .setName("server")
        .setDescription("Replies with server info!"),
    new SlashCommandBuilder()
        .setName("user")
        .setDescription("Replies with user info!"),
    new SlashCommandBuilder()
        .setName("deploy")
        .setDescription("Deploy latest API."),
].map((command) => command.toJSON());

export const APIVersion = "1.0.0";
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

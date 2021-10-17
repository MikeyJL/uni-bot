"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployAPI = void 0;
require("dotenv").config();
var SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
var REST = require("@discordjs/rest").REST;
var Routes = require("discord-api-types/v9").Routes;
var commands = [
    new SlashCommandBuilder().setName("help").setDescription("Need help?"),
    new SlashCommandBuilder()
        .setName("version")
        .setDescription("Displays the version of the API."),
].map(function (command) { return command.toJSON(); });
var deployAPI = function () {
    var rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
        body: commands,
    })
        .then(function () {
        return console.log("Successfully registered application commands.");
    })
        .catch(console.error);
};
exports.deployAPI = deployAPI;

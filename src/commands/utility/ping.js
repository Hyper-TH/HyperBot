const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with something!'),
    async execute(interaction) {
        await interaction.reply('No');
    },
};
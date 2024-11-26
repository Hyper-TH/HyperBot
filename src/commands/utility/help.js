const { helpEmbed } = require( '../../assets/embeds.js');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get list of commands'),
    async execute(interaction) {
        const merryHyper = new AttachmentBuilder(
            path.resolve(__dirname, '../../assets/merryHyper.png'),
            { name: 'merryHyper.png' }
        );

        await interaction.reply({ embeds: [helpEmbed], files: [merryHyper] })
    },
};
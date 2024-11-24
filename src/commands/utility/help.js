const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

// inside a command, event listener, etc.
const helpEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Hyper Bot', iconURL: 'attachment://merryHyper.png', url: 'https://discord.js.org' })
	.setDescription('A very simple Discord Bot')
	.setThumbnail('attachment://hyper.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('attachment://hyper.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'attachment://hyper.png' });

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get list of commands'),
    async execute(interaction) {
        await interaction.reply({ embeds: [helpEmbed] })
    },
};
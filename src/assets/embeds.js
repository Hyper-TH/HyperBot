const { EmbedBuilder } = require('discord.js');

const helpEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Help')
	.setURL('https://discord.js	.org/')
	.setAuthor({ name: 'Hyper Bot', iconURL: 'attachment://merryHyper.png', url: 'https://discord.js.org' })
	.setDescription('A very simple Discord Bot')
	.setThumbnail('attachment://merryHyper.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('attachment://merryHyper.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'attachment://merryHyper.png' });

module.exports = { helpEmbed };
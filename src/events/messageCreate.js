const { Events } = require('discord.js');
const { hyperBoardId, channelId } = require('../../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const specificUserId = hyperBoardId;
        const specificChannelId = channelId;

        if (message.author.id === specificUserId && message.channel.id === specificChannelId) {
            const commandName = message.interaction?.commandName;
            const user = message.interaction?.user;

            if (!commandName || !user) {
                console.error('Invalid interaction: missing commandName or user.');
                return;
            }

            try {
                if (commandName === "bump") {
                    console.log(`Bump detected from: ${user.tag}`);
                    await message.reply(`Detected a bump from: ${user}`);
                } else {
                    console.log(`Detected disboard interaction: ${commandName}`);
                    await message.reply(`Detected a disboard interaction from: ${user}`);
                }
            } catch (error) {
                console.error('Error responding to message:', error);
            }
        }
    }
}
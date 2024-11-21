const { disboardId } = require('../../../config.json');
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        const specificUserId = disboardId;

        if (message.author.id === specificUserId) {
            const randChance = Math.random();
            if (randChance < 0.2) {
                await message.channel.send(`Ping!`);
            }
        }
    }
};
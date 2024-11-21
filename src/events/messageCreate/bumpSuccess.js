const Level = require('../../models/Level');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const getRandomXp = require('../../utils/getRandomXp');
const { hyperBoardId, channelId } = require('../../../config.json');
const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
        async execute(message) {
        const specificUserId = hyperBoardId;
        const specificChannelId = channelId;

        if (message.author.id === specificUserId && message.channel.id === specificChannelId) {
            const commandName = message.interaction?.commandName;
            const user = message.interaction?.user;
            const userId = message.interaction?.user.id;
            const userName = message.interaction?.user.username;

            if (!commandName || !user) {
                console.error('Invalid interaction: missing commandName or user.');
                return;
            }

            if (commandName === "bump success") {
                const xpToGive = getRandomXp(5, 15);

                // Mongo query
                const query = { userId, guildId: message.guild.id };
                const level = await Level.findOne(query);

                // If instance available
                if (level) {
                    level.xp += xpToGive;

                    await message.channel.send(`${user} you have received **${xpToGive} xp**.`);

                    if (level.xp > calculateLevelXp(level.level)) {
                        level.xp = 0;
                        level.level += 1;
                        console.log("Sending message now..");

                        await message.channel.send(`${user} you have leveled up to **level ${level.level}**.`);
                    }

                    await level.save();
                } else {
                    console.log("Creating new user instance");

                    // Create new user instance
                    const newLevel = new Level({
                        userId,
                        userName,
                        guildId: message.guild.id,
                        xp: xpToGive,
                        level: 0
                    });

                    await newLevel.save();
                }
            } else {
                console.log(`Detected disboard interaction: ${commandName}`);
            }
        }
    }
};
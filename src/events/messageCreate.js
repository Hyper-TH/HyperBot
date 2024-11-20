const { Events } = require('discord.js');
const { hyperBoardId, channelId } = require('../../config.json');
const Level = require('../models/Level');
const calculateLevelXp = require('../utils/calculateLevelXp');

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO: Make this cleaner
// TODO: Have each event be a separate folder instead
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

            try {
                if (commandName === "bump success") {

                    const xpToGive = getRandomXp(5, 15);

                    const query = {
                        userId: userId,
                        guildId: message.guild.id
                    };

                    const level = await Level.findOne(query);

                    if (level) {
                        console.log("Found user in database");
                        level.xp += xpToGive;

                        message.channel.send(`XP given to: ${userName}`);

                        if (level.xp > calculateLevelXp(level.level)) {
                            level.xp = 0;
                            level.level += 1;

                            message.channel.send(`${user} you have leveled up to **level ${level.level}**.`);
                        }

                        await level.save().catch((e) => {
                            console.log(`Error saving updated level ${e}`);
                            return
                        });
                    } else {
                        console.log("Creating user in database");

                        const newLevel = new Level({
                            userId: userId,
                            userName: userName,
                            guildId: message.guild.id,
                            xp: xpToGive,
                        });

                        await newLevel.save();
                        message.channel.send(`XP given to: ${userName}`);

                    }

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
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag} [2024]`);

        // Set the bot's presence
        client.user.setPresence({
            status: 'online', // Can be 'online', 'idle', 'dnd', or 'invisible'
            activities: [
                {
                    name: 'your mom', // The activity text
                    type: 'PLAYING', // Activity type: 'PLAYING', 'STREAMING', 'LISTENING', 'WATCHING', 'COMPETING'
                },
            ],
        });

        console.log('Presence set successfully!');
    },
};
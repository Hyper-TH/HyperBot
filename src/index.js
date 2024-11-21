const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const loadEvents = require('./utils/loadEvents');
const loadCommands = require('./utils/loadCommands');
const connectToDB = require('./utils/connectToDB');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();

const commandsPath = path.join(__dirname, 'commands');
loadCommands(commandsPath, client);

const eventsPath = path.join(__dirname, 'events/messageCreate');
loadEvents(eventsPath, client);

(async () => {
    await connectToDB();
    client.login(token);
})();

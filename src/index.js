import { ActivityType, Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent 
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Set custom status
    client.user.setActivity('your mom', { type: ActivityType.Playing });
});

client.login(process.env.TOKEN);
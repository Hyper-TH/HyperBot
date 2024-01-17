import { ActivityType, Client, IntentsBitField, Constants } from 'discord.js';
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

client.on('messageCreate', (message) => {
    // Replace 'YOUR_CHANNEL_ID' with the actual ID of the channel you want to listen to
    const channelIdToWatch = '765156401118838825';
    // const channelIdToWatch = '933792627692814416';

    // Check if the message is from the desired channel
    if (message.channelId === channelIdToWatch) {
        console.log(`New message in channel ${channelIdToWatch}: ${message.content}`);

        // Check if the message has embeds
        if (message.embeds.length > 0) {
            console.log(`Message contains ${message.embeds.length} embed(s)`);

            // Access properties of the first embed (assuming there is at least one)
            const firstEmbed = message.embeds[0];
            console.log(`Embed Title: ${firstEmbed.title}`);
            console.log(`Embed Description: ${firstEmbed.description}`);
            console.log(`Other embed properties:`, firstEmbed);

            // Send a response message
            const responseMessage = 'Bump detected, XP added';
            message.channel.send(responseMessage);
            
        } else {
            console.log('Message does not contain any embeds.');
        }
    }
});

client.login(process.env.TOKEN);
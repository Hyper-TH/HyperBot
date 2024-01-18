import { ActivityType, Client, IntentsBitField, Constants } from 'discord.js';
import dotenv from 'dotenv';
import https from 'https';

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

client.on('messageCreate', async (message) => {
    // Replace 'YOUR_CHANNEL_ID' with the actual ID of the channel you want to listen to
    const channelIdToWatch = process.env.CHANNEL;

    // Check if the message is from the desired channel
    if (message.channelId === channelIdToWatch && message.author.id !== client.user.id) {
        console.log(`New message in channel ${channelIdToWatch}: ${message.content}`);

        // Check if the message has embeds
        if (message.embeds.length > 0) {
            console.log(`Message contains ${message.embeds.length} embed(s)`);

            // Access properties of the first embed (assuming there is at least one)
            const firstEmbed = message.embeds[0];

            if (firstEmbed.description.includes("Bump done!")) {
                const responseMessage = 'Bump detected';
                message.channel.send(responseMessage);

                const list = await messageList();

                for (let i = 0; i < list.length; i++) {
                    const currentObject = list[i];
            
                    if (currentObject.application_id === process.env.DISBOARD) {
                        console.log(`Found Disboard!`);
                        console.log(currentObject);
                        const string = "Last successful bumper: " + currentObject.interaction.user.username
                        
                        console.log(string);
                        message.channel.send(string);

                        break;
                    }
                }                
            }
            
        } else {
            console.log('Message does not contain any embeds.');
        }
    }
});

async function messageList() {
    const option = {
        host: "discord.com",
        path: `/api/v9/channels/${process.env.CHANNEL}/messages?limit=50`,
        headers: {
            accept: "*/*",
            accept_language: "en-GB,en-US;q=0.9,en;q=0.8",
            authorization: "",
            sec_fetch_dest: "empty",
            sec_fetch_mode: "cors",
            sec_fetch_site: "same-origin",
            x_debug_options: "bugReporterEnabled",
            x_discord_locale: "en-US",
            x_discord_timezone: "Europe/London",
            x_super_properties: `${process.env.XSUPER}`,
            cookie: `${process.env.COOKIE}`,
            Referer: `${process.env.REFERER}`,
            // "Referrer-Policy": "strict-origin-when-cross-origin"| 
        }
    };

    
    return new Promise((resolve, reject) => {
        https.get(option, (response) => {
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
                try {
                    const parsed = JSON.parse(result);

                    resolve(parsed);
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            response.on('error', function (error) {
                console.error('Error:', error);
            })
        });
    });
};



client.login(process.env.TOKEN);
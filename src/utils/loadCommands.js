const fs = require('fs');
const path = require('path');

/**
 * Recursively loads and registers events from the given directory.
 * @param {string} dir - The directory to load events from.
 * @param {Client} client - The Discord client.
 */

function loadCommands(dir, client) {
    const commandFolders = fs.readdirSync(dir);

    for (const folder of commandFolders) {
        const commandsPath = path.join(dir, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            // Set new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }

            console.log(`Loaded command: ${command.data.name} from file: ${filePath}`);
        }
    }
}

module.exports = loadCommands;
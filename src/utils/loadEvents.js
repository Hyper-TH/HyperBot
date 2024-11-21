const fs = require('fs');
const path = require('path');

/**
 * Recursively loads and registers events from the given directory.
 * @param {string} dir - The directory to load events from.
 * @param {Client} client - The Discord client.
 */

function loadEvents(dir, client) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursive as filePath is a folder
            loadEvents(filePath, client);
        } else if (file.endsWith('.js')) {
            const event = require(filePath);

            if (!event || !event.name || typeof event.execute !== 'function') {
                console.error(`Invalid event structure in file: ${filePath}`);
                continue;
            } 

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }

            console.log(`Loaded event: ${event.name} from file: ${filePath}`);
        }
    }
}

module.exports = loadEvents;
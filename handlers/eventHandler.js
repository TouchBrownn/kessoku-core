const fs = require('fs');
const path = require('path');
const { pink, blue, bold, reset } = require('../utils/colors');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '..', 'events');
    if (!fs.existsSync(eventsPath)) return;

    let eventCount = 0;

    const eventFolders = fs.readdirSync(eventsPath); // Lê as pastas dentro de /events

    for (const folder of eventFolders) {
        const folderPath = path.join(eventsPath, folder);

        const isDirectory = fs.lstatSync(folderPath).isDirectory();
        const files = isDirectory
            ? fs.readdirSync(folderPath).filter(f => f.endsWith('.js'))
            : [folder].filter(f => f.endsWith('.js'));

        for (const file of files) {
            const filePath = isDirectory ? path.join(folderPath, file) : path.join(eventsPath, file);
            const event = require(filePath);

            if (!event?.name || typeof event.execute !== 'function') continue;

            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }

            eventCount++;
        }
    }

    console.log(`${pink}🎸 [Bocchi-Log]:${reset} A-Ah... eu carreguei ${blue}${bold}${eventCount}${reset} eventos...`);
};
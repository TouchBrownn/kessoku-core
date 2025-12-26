const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');
const { pink, blue, bold, reset } = require('../utils/colors.js');

module.exports = (client) => {
    client.commands = new Collection();

    const commandsPath = path.join(__dirname, '..', 'commands');
    if (!fs.existsSync(commandsPath)) return;

    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);

        if (fs.lstatSync(folderPath).isDirectory()) {
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);
                const command = require(filePath);

                if (command?.data?.name && typeof command.execute === 'function') {
                    client.commands.set(command.data.name, command);
                }
            }
        } else if (folder.endsWith('.js')) {
            const command = require(folderPath);
            if (command?.data?.name && typeof command.execute === 'function') {
                client.commands.set(command.data.name, command);
            }
        }
    }
    console.log(`${pink}🎸 [Bocchi-Log]:${reset} S-são ${blue}${bold}${client.commands.size}${reset} comandos carregados...`);
};
const { REST, Routes } = require('discord.js');
const { DISCORD_TOKEN, API_CLIENT, SERVIDOR } = require('./config.json');
const fs = require('fs');
const path = require('path');
const { pink, blue, bold, reset } = require('./utils/colors');

module.exports = async () => {
    const commands = [];
    const commandsPath = path.join(__dirname, 'commands');

    const commandFolders = fs.readdirSync(commandsPath);
    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);

        if (fs.lstatSync(folderPath).isDirectory()) {
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(path.join(folderPath, file));
                if (command?.data) commands.push(command.data.toJSON());
            }
        } else if (folder.endsWith('.js')) {
            const command = require(folderPath);
            if (command?.data) commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

    try {
        console.log(`${pink}🎸 [Bocchi-Deploy]:${reset} S-sincronizando todos os comandos...`);

        await rest.put(
            Routes.applicationGuildCommands(API_CLIENT, SERVIDOR),
            { body: commands }
        );

        console.log(`${pink}✅ [Bocchi-Deploy]:${reset} ${blue}${bold}${commands.length}${reset} comandos sincronizados!`);
    } catch (error) {
        console.error(`${pink}🎸 [Bocchi-Error]:${reset} A Bocchi teve um ataque de pânico no deploy:`, error);
    }
};
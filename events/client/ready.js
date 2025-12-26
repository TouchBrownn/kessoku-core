const { Events } = require('discord.js');
const { pink, blue, bold, reset } = require('../../utils/colors');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${pink}✨ [Bocchi-Log]:${reset} ${blue}${bold}${client.user.tag}${reset} está online!`);
    }
};

const { Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const colors = require('../../utils/colors');
const config = require('../../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        const guild = client.guilds.cache.get(config.SERVIDOR);
        if (!guild) {
            console.log(`❌ ${colors.red}[Bocchi-Log]:${colors.reset} Guild não encontrada`);
            return;
        }

        const channel = guild.channels.cache.get(config.CANAL_VOZ);
        if (!channel || channel.type !== 2) {
            console.log(`❌ ${colors.red}[Bocchi-Log]:${colors.reset} canal de voz inválido`);
            return;
        }

        joinVoiceChannel({
            channelId: channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
        });
            console.log(
                `${colors.pink}🎧 [Bocchi-Log]:${colors.reset} ${colors.bold}${client.user.username}${colors.reset} entrou na call de voz.`
            );
    }
};

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function formatUptime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Mostra o status atual do bot.'),

    async execute(interaction) {
        const uptime = formatUptime(process.uptime());
        const memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
        const ping = interaction.client.ws.ping;

        const embed = new EmbedBuilder()
            .setTitle('E-eu estou funcionando...')
            .setColor(0xf3a0c6)
            .addFields(
                { name: '⏱️ tempo ligada', value: uptime, inline: true },
                { name: '💾 memória', value: `${memory} mb`, inline: true },
                { name: '📡 ping', value: `${ping} ms`, inline: true }
            )
            .setFooter({ text: 'kessoku core' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};

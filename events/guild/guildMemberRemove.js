const { Events, EmbedBuilder } = require('discord.js');
const { CANAL_SAIDA } = require('../../config.json');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,

    execute(member) {
        const canal = member.guild.channels.cache.get(CANAL_SAIDA);
        if (!canal) return;

        const frases = [
            'alguém foi embora… Bocchi entrou em curto-circuito.',
            'uma presença a menos. a pressão social caiu 5%...',
            'parece que alguém saiu. eu deveria ter dito tchau? *pânico*',
            'despedidas são difíceis. vou me esconder na minha caixa.',
            'o amplificador continua aqui. o palco ficou mais vazio.'
        ];

        const frase = frases[Math.floor(Math.random() * frases.length)];

        const embed = new EmbedBuilder()
            .setColor('#706fd3')
            .setTitle('📦 Menos um integrante na banda...')
            .setDescription(
                `**"${frase}"**\n\n` +
                `**${member.user.username}** abandonou o palco.\n` +
                `agora restam apenas **${member.guild.memberCount}** de nós aqui.\n\n` +
                `*Bocchi está processando a partida...*`
            )
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: false, size: 512 }))
            .setFooter({
                text: 'Bocchi está observando o vazio...',
                iconURL: member.guild.iconURL()
            })
            .setTimestamp();

        canal.send({ embeds: [embed] });
    }
}
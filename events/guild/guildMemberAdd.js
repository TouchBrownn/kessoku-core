const { Events, EmbedBuilder } = require('discord.js');
const { CANAL_ENTRADA } = require('../../config.json');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,

    execute(member) {
        const canal = member.guild.channels.cache.get(CANAL_ENTRADA);
        if (!canal) return;

        const frasesBocchi = [
            'AHHH! Uma nova pessoa?! *Bocchi entra em modo glitch*',
            'Alguém chegou... rápido, me deem uma caixa de papelão!',
            'Um novo integrante... será que vão me forçar a fazer contato visual?',
            'Entrada detectada. Minha bateria social já caiu para 0%...',
            'Mais um membro para a Kessoku Band? (Espero que não precise falar no microfone)'
        ];

        const frase = frasesBocchi[Math.floor(Math.random() * frasesBocchi.length)];

        const embed = new EmbedBuilder()
            .setColor('#ff9ff3')
            .setTitle('🎸 N-Novo integrante detectado!')
            .setDescription(
                `**"${frase}"**\n\n` +
                `Seja bem-vindo(a) ${member}! \n` +
                `Agora temos **${member.guild.memberCount}** pessoas para eu tentar não ignorar sem querer.`
            )
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: false, size: 512 }))
            .setImage('https://media.tenor.com/89S0e4B0m38AAAAC/bocchi-the-rock-bocchi.gif')
            .setFooter({ text: 'Bocchi the Bot • Tentando manter a calma', iconURL: member.guild.iconURL() })
            .setTimestamp();

        canal.send({ content: `||<@${member.id}>||`, embeds: [embed] });
    }
}
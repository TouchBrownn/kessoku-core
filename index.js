const { Events, Client, GatewayIntentBits, Collection } = require('discord.js');
const colors = require('./utils/colors');
const config = require('./config.json');
const deployCommands = require('./deploy.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
})


client.cooldowns = new Collection();

(async () => {
    process.stdout.write(colors.clear);
    console.log(colors.clear);

    console.log(`${colors.pink}╔═══════════════════════════════════════════╗${colors.reset}`);
    console.log(
        `${colors.pink}║${colors.reset}   🎸 ${colors.bold}BOOTING...${colors.reset} Sistema Kessoku Core      ${colors.pink}║${colors.reset}`
    );
    console.log(`${colors.pink}╚═══════════════════════════════════════════╝${colors.reset}\n`);


    await deployCommands();

    require('./handlers/commandHandler')(client);
    require('./handlers/eventHandler')(client);

    client.login(config.DISCORD_TOKEN);
})();

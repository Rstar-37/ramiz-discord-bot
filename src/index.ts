import { Client, Intents, Message } from 'discord.js';

const dclient: Client<boolean> = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

dclient.on('ready', () => {
    console.log(`Logged in as ${dclient.user?.tag}!`)
});

dclient.on('message', (msg: Message<boolean>) => {
    const mod = '934241462533627905';
    let hasMod = msg.member.roles.cache.find(role => role.id == mod)
    if (!hasMod) return;
    if (msg.content !== 'remove wordle complete') return;
    const wordlePlayer = '934164576403087391';
    const wordleComplete = '934174868117794937';
    let wordleCompleteRole = msg.guild.roles.cache.find(role => role.id == wordlePlayer);
    msg.guild.members.cache.forEach(member => {
        if (member.roles.cache.some(role => role.id == wordleComplete)) {
            member.roles.remove(wordleCompleteRole);
        }
    });
    (msg.channel as any).send('Success!');
});

let discordToken = process.env.DISCORD_TOKEN;
if (!discordToken) {
    let auth = require('./bot.json');
    discordToken = auth.token;
}
dclient.login(discordToken);


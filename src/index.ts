import { Client, Intents, Message } from 'discord.js';

const dclient: Client<boolean> = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

dclient.on('ready', () => {
    console.log(`Logged in as ${dclient.user?.tag}!`)
});

dclient.on('message', (msg: Message<boolean>) => {
    msg.guild.members.fetch();
    msg.guild.roles.fetch();
    const mod = '934241462533627905';
    let hasMod = msg.member.roles.cache.find(role => role.id == mod)
    if (!hasMod) return;
    if (msg.channelId !== '934174624122535976') return;
    if (!msg.content.startsWith('A New Wordle just started!')) return;
    // if (!msg.content.startsWith('..')) return;
    const wordlePlayer = '934164576403087391';
    const wordleComplete = '934174868117794937';
    const wordleCompleteRole = msg.guild.roles.cache.find(role => role.id == wordleComplete);
    msg.guild.members.cache.forEach(member => {
        console.log('loop: ', member.user.username)
        if (member.roles.cache.some(role => role.id == wordleComplete)) {
            console.log('found: ', member.user.username);
            member.roles.remove(wordleCompleteRole);
        }
    });
    // (msg.channel as any).send('Success!');
});

let discordToken = process.env.DISCORD_TOKEN;
if (!discordToken) {
    let auth = require('./bot.json');
    discordToken = auth.token;
}
dclient.login(discordToken);


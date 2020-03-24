// @ts-check

const Discord = require('discord.js')

var Client = {
    // @ts-ignore
    config: require('../config.json'),
    bot: new Discord.Client(),
    commands: {}
}

// @ts-ignore
const { token } = require('../config.json');

let commandsList = require("fs").readdirSync('./commands/');

// when the client is ready, run this code
// this event will only trigger one time after logging in
Client.bot.on('ready', () => {
    console.log(`Logged in as ${Client.bot.user.tag}!`);

    // set present status
    Client.bot.user.setPresence({
        activity: {
            name: 'with discord.js'
        },
        status: 'idle'
    }) 
});

// when a message is sent to any channel bot has access to, run this code
// this event will trigger after receiving a message
Client.bot.on('message', async message => {

    if (!message.content.startsWith(Client.config.prefix)) return;

    console.log(message.content);

    //prevent reacting on own messages
    if (message.author.id == Client.bot.user.id)
        return;

    commandsList.forEach(element => {
        if (element.match(/\.js$/)) {
            delete require.cache[require.resolve(`./commands/${element}`)];
            Client.commands[element.slice(0, -3)] = require(`./commands/${element}`);
        }
    });
    console.log(`loaded commands ${commandsList}`)

    let args = message.content.slice(Client.config.prefix.length).split(' ');

    commandsList.forEach(cmd => {
        console.log(cmd.slice(0, -3).toLowerCase());
        cmd = cmd.slice(0, -3);
        if (args[0].toLowerCase() === cmd.toLowerCase()) {
            Client.commands[cmd].func(Client, message, args);
        }
        if (message.author.id === '688101194215981121') {
            message.member.setNickname('zradko');
        }
    });
});

Client.bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelID
    let oldUserChannel = oldMember.channelID

    console.log("old " + oldUserChannel)
    console.log("new " + newUserChannel)

    const connection = Client.bot.voice.connections;
    if (!connection || !connection.first)
        return;

    if (Client.bot.channels.cache.some(e => e.id === oldUserChannel) && newUserChannel !== oldUserChannel) {
        console.log("jedudopyce");
        connection.first().play('../assets/sfx/jedu-do-pici-stadyma.mp3')
    }
    if (Client.bot.channels.cache.some(e => e.id === newUserChannel) && newUserChannel !== oldUserChannel) {
        console.log("kurvauuz");
        connection.first().play('../assets/sfx/extra/kurva-uz.mp3')
    }
});


Client.bot.login(token);

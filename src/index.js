// require prefix and token from config
const { prefix, token } = require('../config.json');

// require the discord.js module for everything
const Discord = require('discord.js')

// create a new Discord client - this is the bot
// TODO: rename to bot?
const client = new Discord.Client()

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // set present status
    client.user.setPresence({
        game: {
            name: 'my code',
            type: 'WATCHING'
        },
        status: 'idle'
    })

    // const yourchannel = client.channels.get("688102376221311062").then(channel => channel).catch(error => alert(error.message))
    // yourchannel.send("Caute hnisy!")
})

// when a message is sent to any channel bot has access to, run this code
// this event will trigger after receiving a message
client.on('message', message => {
    console.log(message.content);

    if (message.content.startsWith('${prefix}nejdemipripojit')) {
        message.channel.send('Napis \"chcem ist do voicu.\"');
    } else if (message.content.startsWith(`${prefix}IQ`)) {
        message.channel.send(between(0, 250));
    }
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}



client.login(token);
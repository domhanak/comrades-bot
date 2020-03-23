const Discord = require('discord.js')

Client = {
    config: require('../config.json'),
    bot: new Discord.Client(),
    commands: {}
}

const { prefix, token } = require('../config.json');

let commandsList = require("fs").readdirSync('./commands/');

// when the client is ready, run this code
// this event will only trigger one time after logging in
Client.bot.on('ready', () => {
    console.log(`Logged in as ${Client.bot.user.tag}!`);

    // set present status
    Client.bot.user.setPresence({
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
Client.bot.on('message', async message => {
    console.log(message.content);
    
    //prevent reacting on onw messages
    if(message.author == Client.bot.user.id) return;

    commandsList.forEach(element => {
        if (element.match(/\.js$/)) { 
            delete require.cache[require.resolve(`./commands/${element}`)]; 
            Client.commands[element.slice(0, -3)] = require(`./commands/${element}`);
        }
    });
    console.log(`loaded commands ${commandsList}`)
    
    args = message.content.slice(Client.config.prefix.length).split(' ');
    console.log(args)
    
    if (!message.content.startsWith(Client.config.prefix)) 
        return;

    commandsList.forEach(cmd => {
        console.log(args[0].toLowerCase());
        console.log(cmd.slice(0,-3).toLowerCase());
        cmd = cmd.slice(0,-3);
        if (args[0].toLowerCase() === cmd.toLowerCase()) {
            Client.commands[cmd].func(Client, message, args);
        }   
    });
});

Client.bot.login(token);
module.exports = {
    help: "Vrati pong",
    func: (client, message) => {
        message.channel.send('Pong!');
        console.log(client.prefix);
    }
}
// @ts-check

module.exports = {
    help: "Povie kto je kokot, ale naozaj",
    func: (client, message) => {
        
        message.channel.send(`${message.author} je kokot`);
    }
}
module.exports = {
    help: "Povie kto je kokot, ale naozaj",
    func: (_, message) => {
        message.channel.send(`${message.author} je kokot`);
    }
}
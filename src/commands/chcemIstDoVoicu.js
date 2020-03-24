module.exports = {
    help: "Vytvori invite na voice v ktorom si",
    func: (client, message) => {
        //message.react('😢')
        message.member.voice.channel.createInvite().then(invite =>
            message.channel.send(invite.url)
        ).catch(message.channel.send("nevydalo"));
    }
}
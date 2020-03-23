module.exports = {
    help: "Prida comrades bota do voice chatu",
    func: (client, message) => {        
        //general
        //const voiceChannel = client.bot.channels.fetch('688102376225505296')
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel) {
          message.member.voice.channel.join();
        } else {
          message.reply('Musis ist do voicu kamo!');
        }
    }
}
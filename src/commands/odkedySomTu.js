module.exports = {
    help: "Povie ti odkedy si sucastou tejto karanteny",
    func: (_, message) => {
         message.guild.members.fetch(message.author)
                .then(member => {
                    message.channel.send("Ta das od " + dateTimeConverter(member.joinedTimestamp));
            }).catch(console.log('nevydalo'));
    }
}

/**
 * Returns date time formated from the unix timestamp
 * @param {*} timestamp 
 */
function dateTimeConverter(timestamp){
    return new Date(timestamp).toLocaleDateString("en-US") + " "
             + new Date(timestamp).toLocaleTimeString("en-US")
  }

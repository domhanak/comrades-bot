module.exports = {
    help: 'Vypise co vsetko ComradeBot vie',
    func: (Client, msg, args) => {     
        console.log("args:" + args);
        
        if (args.length > 1) {
            if (args[1] in Client.commands && Client.commands[args[1]].help){
                msg.channel.send('asciidoc', `${Client.config.prefix + args[1]} :: ${Client.commands[args[1]].help}`);
            }
        } else {
            let help = "";
            console.log(Client.commands);
            
            for (var command in Client.commands) {
                help += `${Client.config.prefix + command} :: ${Client.commands[command].help}\n`
                console.log(help);
            }
            msg.channel.send(help);
        }  
    }
}
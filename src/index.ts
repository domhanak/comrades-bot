import { Discord, On, Client } from '@typeit/discord';
import { Message } from 'discord.js';
import { config } from 'dotenv';
import CommandsList from './commands';
import Command from './command';

config({ path: `${process.cwd()}/.local.env` });

@Discord
export class AppDiscord {
  private static client: Client;
  private prefix: string = '!';
  private cachedCommandInstances: Record<string, Command> = {};

  static start() {
    if (!process.env.TOKEN) {
      throw new Error('Token has not been set. Define token in .local.env');
    }

    this.client = new Client();
    this.client.login(process.env.TOKEN, `${__dirname}/*Discord.ts`);
  }

  @On('message')
  async onMessage(message: Message, client: Client) {
    if (AppDiscord.client.user.id !== message.author.id) {
      if (message.content[0] === this.prefix) {
        const [cmd, ...args] = message.content
          .replace(this.prefix, '')
          .toLowerCase()
          .split(' ');

        if (cmd === 'hello') {
          message.reply('Hello 🍻!');
          return;
        }

        if (cmd === 'help') {
          message.reply(
            `Použi dačo z tohto: ${Object.keys(CommandsList).join(', ')}`
          );
          return;
        }

        const Command = CommandsList[cmd];

        if (Command) {
          console.info(`${cmd} [${args.join(', ')}] - execution`);

          try {
            if (!this.cachedCommandInstances[cmd]) {
              this.cachedCommandInstances[cmd] = new Command(
                message,
                client,
                args
              );
            }

            this.cachedCommandInstances[cmd].execute();
          } catch (e) {
            console.error(e);
            message.channel.send('Nieco sa posralo :(, pozri konzolu.');
          }

          return;
        }

        message.reply(
          `Nepoznám také 🤷‍♂️... Skús dačo z tohto ${Object.keys(
            CommandsList
          ).join(', ')}`
        );
      }
    }
  }
}

AppDiscord.start();

import { Message } from 'discord.js'
import { Client } from '@typeit/discord'

export default class Command {
    message: Message
    client: Client

    constructor(message: Message, client: Client) {
        this.message = message
        this.client = client
    }

    async execute() {}
}

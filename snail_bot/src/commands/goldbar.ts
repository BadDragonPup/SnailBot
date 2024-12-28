import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

const GoldBarCommandConfig = {

    name: 'GoldBar',

    description: 'GoldBar command description',

    execute: (args: string[]) => {

        console.log('Executing GoldBar command with args:', args);
    }
}

export class GoldBarCommand {
    private total: number;

    constructor() {
        this.total = 0;
    }

    public add(value: number): void {
        this.total += value;
    }

    public subtract(value: number): void {
        this.total -= value;
    }

    public getTotal(): number {
        return this.total;
    }

    public reset(): void {
        this.total = 0;
    }
}

export const goldBarCommand: Command = {
    name: 'goldbar',
    description: 'Description of the GoldBar command',
    execute: (args: string[], message: Message) => {
        // Implementation of the execute function
        if (message.channel.type === ChannelType.GuildText) {
            (message.channel as TextChannel).send('GoldBar command executed.');
        }
    },
};

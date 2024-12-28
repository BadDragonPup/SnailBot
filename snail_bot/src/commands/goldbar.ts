import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

export const goldBarCommand: Command = {
    name: 'goldbar',
    description: 'GoldBar command description',
    execute: async (args: string[], message: Message): Promise<void> => {
        console.log('Executing GoldBar command with args:', args);
        if (message.channel.type === ChannelType.GuildText) {
            await (message.channel as TextChannel).send('GoldBar command executed.');
        }
    }
};

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

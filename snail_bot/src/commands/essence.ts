import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

export class EssenceCommand {
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

export const essenceCommand: Command = {
    name: 'essence',
    description: 'Description of the Essence command',
    execute: async (args: string[], message: Message): Promise<void> => {
        // Implementation of the execute function
        if (message.channel.type === ChannelType.GuildText) {
            await (message.channel as TextChannel).send('Essence command executed.');
        }
    },
};
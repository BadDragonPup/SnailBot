import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

interface AFFCT {
    ART: number;
    FAME: number;
    FTH: number;
    CIV: number;
    TECH: number;
}

export class AFFCTCommand {
    private totals: AFFCT;

    constructor() {
        this.totals = { ART: 0, FAME: 0, FTH: 0, CIV: 0, TECH: 0 };
    }

    public add(category: keyof AFFCT, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] += value;
        } else {
            console.error(`Invalid category: ${category}`);
        }
    }

    public subtract(category: keyof AFFCT, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] -= value;
        } else {
            console.error(`Invalid category: ${category}`);
        }
    }

    public getTotal(category: keyof AFFCT): number {
        if (this.totals[category] !== undefined) {
            return this.totals[category];
        } else {
            console.error(`Invalid category: ${category}`);
            return 0;
        }
    }

    public getAllTotals(): AFFCT {
        return this.totals;
    }

    public getTotalSum(): number {
        return Object.values(this.totals).reduce((sum, value) => sum + value, 0);
    }
}

export const affctCommand: Command = {
    name: 'affct',
    description: 'Description of the AFFCT command',
    execute: async (args: string[], message: Message): Promise<void> => {
        // Implementation of the execute function
        if (message.channel.type === ChannelType.GuildText) {
            await (message.channel as TextChannel).send('AFFCT command executed.');
        }
    },
};

import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

interface HARD {
    HP: number;
    ATK: number;
    CIV: number;
    DEF: number;
}

class HARDCommand {
    private totals: HARD;

    constructor() {
        this.totals = { HP: 0, ATK: 0, CIV: 0, DEF: 0 };
    }

    public add(category: keyof HARD, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] += value;
        } else {
            console.error(`Invalid category: ${category}`);
        }
    }

    public subtract(category: keyof HARD, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] -= value;
        } else {
            console.error(`Invalid category: ${category}`);
        }
    }

    public getTotal(category: keyof HARD): number {
        if (this.totals[category] !== undefined) {
            return this.totals[category];
        } else {
            console.error(`Invalid category: ${category}`);
            return 0;
        }
    }

    public getAllTotals(): HARD {
        return this.totals;
    }

    public getTotalSum(): number {
        return Object.values(this.totals).reduce((sum, value) => sum + value, 0);
    }
}

export const hardCommand: Command = {
    name: 'hard',
    description: 'Description of the HARD command',
    execute: (args: string[], message: Message) => {
        // Implementation of the execute function
        if (message.channel.type === ChannelType.GuildText) {
            (message.channel as TextChannel).send('HARD command executed.');
        }
    },
};

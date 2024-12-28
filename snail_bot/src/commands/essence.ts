import { Command } from './command';
import { Message, TextChannel, ChannelType, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

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

export default {
    data: new SlashCommandBuilder()
        .setName('essence')
        .setDescription('Description of the essence command.'),
    async execute(interaction: CommandInteraction) {
        try {
            await interaction.reply('Essence command executed.');
            logger.info('Essence command executed successfully.');
        } catch (error) {
            logger.error('Error executing essence command:', error as Error);
            await interaction.reply({ content: 'There was an error executing the essence command.', ephemeral: true });
        }
    },
};
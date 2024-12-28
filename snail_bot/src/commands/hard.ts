import { Command } from './command';
import { Message, TextChannel, ChannelType, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

export const hardCommand: Command = {
    name: 'hard',
    description: 'Description of the HARD command',
    execute: async (args: string[], message: Message): Promise<void> => {
        console.log('Executing HARD command with args:', args);
        if (message.channel.type === ChannelType.GuildText) {
            await (message.channel as TextChannel).send('HARD command executed.');
        }
    }
};

export default {
    data: new SlashCommandBuilder()
        .setName('hard')
        .setDescription('Description of the hard command.'),
    async execute(interaction: CommandInteraction) {
        try {
            await interaction.reply('Hard command executed.');
            logger.info('Hard command executed successfully.');
        } catch (error) {
            logger.error('Error executing hard command:', error as Error);
            await interaction.reply({ content: 'There was an error executing the hard command.', ephemeral: true });
        }
    },
};

export class HardCommand {
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

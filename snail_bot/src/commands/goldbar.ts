import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

export default {
    data: new SlashCommandBuilder()
        .setName('goldbar')
        .setDescription('Description of the goldbar command.'),
    async execute(interaction: CommandInteraction) {
        try {
            await interaction.reply('Goldbar command executed.');
            logger.info('Goldbar command executed successfully.');
        } catch (error) {
            logger.error('Error executing goldbar command:', error as Error);
            await interaction.reply({ content: 'There was an error executing the goldbar command.', ephemeral: true });
        }
    },
};

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

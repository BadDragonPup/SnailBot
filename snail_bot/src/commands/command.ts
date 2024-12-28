import { Message, PermissionResolvable, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    permissions?: PermissionResolvable[];
    cooldown?: number;
    execute: (args: string[], message: Message) => Promise<void>;
}

const logger = Logger.getInstance();

export default {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('Description of the command.'),
    async execute(interaction: CommandInteraction) {
        try {
            await interaction.reply('Command executed.');
            logger.info('Command executed successfully.');
        } catch (error) {
            logger.error('Error executing command:', error as Error);
            await interaction.reply({ content: 'There was an error executing the command.', ephemeral: true });
        }
    },
};
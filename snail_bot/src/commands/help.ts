import { Command } from './command';
import { Message, TextChannel, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

export const commands = new Map<string, Command>();

const logger = Logger.getInstance();

export const helpCommand: Command = {
    name: 'help',
    description: 'Lists all available commands and their descriptions',
    execute: async (_args: string[], message: Message): Promise<void> => {
        const helpMessage = Array.from(commands.values())
            .map((command: Command) => `**${command.name}**: ${command.description}`)
            .join('\n');
        if (message.channel instanceof TextChannel) {
            (message.channel as TextChannel).send(helpMessage);
        }
    },
};

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides help information for commands.'),
    async execute(interaction: CommandInteraction) {
        try {
            const helpMessage = 'Here are the available commands:\n- /ping: Replies with Pong!\n- /help: Provides help information for commands.';
            await interaction.reply(helpMessage);
            logger.info('Help command executed successfully.');
        } catch (error) {
            logger.error('Error executing help command:', error as Error);
            await interaction.reply({ content: 'There was an error executing the help command.', ephemeral: true });
        }
    },
};
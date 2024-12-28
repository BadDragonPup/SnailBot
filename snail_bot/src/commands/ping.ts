import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
        try {
            await interaction.reply('Pong!');
            logger.info('Ping command executed successfully.');
        } catch (error) {
            logger.error('Error executing ping command:', error);
            await interaction.reply({ content: 'There was an error executing the ping command.', ephemeral: true });
        }
    },
};
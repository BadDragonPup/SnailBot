import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { SlashCommandBuilder } from '@discordjs/builders';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Logger from './utils/logger';

dotenv.config();

const logger = Logger.getInstance();

const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID', 'GUILD_ID'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        logger.error(`${envVar} environment variable is not set.`);
        process.exit(1); // Exit the process with an error code
    }
});

const commands: any[] = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;
    if (command && command.data && command.execute) {
        commands.push(command.data.toJSON());
    } else {
        logger.warn(`Command at ${filePath} is missing required properties.`);
    }
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
    try {
        logger.info('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
            { body: commands },
        );

        logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
        logger.error('Failed to reload application (/) commands:', error as Error);
    }
})();
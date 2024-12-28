import { Client, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './commands/index';
import { loadEvents } from './events/index';
import Logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const logger = Logger.getInstance();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    if (client.user) {
        logger.info(`Logged in as ${client.user.tag}`);
    } else {
        logger.error('Client user is null.');
        process.exit(1); // Exit the process with an error code
    }
});

try {
    loadCommands();
    loadEvents(client);
} catch (error) {
    logger.error('Failed to load commands or events:', error as Error);
    process.exit(1); // Exit the process with an error code
}

const requiredEnvVars = ['DISCORD_TOKEN', 'ANOTHER_ENV_VAR']; // Add all required environment variables here
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        logger.error(`${envVar} environment variable is not set.`);
        process.exit(1); // Exit the process with an error code
    }
});

const token = process.env.DISCORD_TOKEN!;
logger.info(`Using token: ${token}`);

client.login(token).catch((err: any) => {
    logger.error('Failed to login:', err);
    process.exit(1); // Exit the process with an error code
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('Received SIGINT. Shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM. Shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

import { Client, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './commands/index';
import { loadEvents } from './events/index';
import Logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const logger = Logger.getInstance();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    logger.info(`Logged in as ${client.user?.tag}`);
});

try {
    loadCommands();
    loadEvents(client);
} catch (error) {
    logger.error('Failed to load commands or events:', error as Error);
    process.exit(1); // Exit the process with an error code
}

if (!process.env.DISCORD_TOKEN) {
    logger.error('DISCORD_TOKEN environment variable is not set.');
    process.exit(1); // Exit the process with an error code
}

client.login(process.env.DISCORD_TOKEN).catch((err: any) => {
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

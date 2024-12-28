import { Client, GatewayIntentBits, Interaction } from 'discord.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Logger from './utils/logger';

dotenv.config();

const logger = Logger.getInstance();

interface ExtendedClient extends Client {
    commands: Map<string, { data: any, execute: (interaction: Interaction) => Promise<void> }>;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations] }) as ExtendedClient;

client.once('ready', () => {
    if (client.user) {
        logger.info(`Logged in as ${client.user.tag}`);
    } else {
        logger.error('Client user is null.');
        process.exit(1); // Exit the process with an error code
    }
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(`Error executing command ${interaction.commandName}:`, error as Error);
        await interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
    }
});

client.commands = new Map<string, { data: any, execute: (interaction: Interaction) => Promise<void> }>();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath).default;
    if (command && command.data && command.execute) {
        client.commands.set(command.data.name, command);
    } else {
        logger.warn(`Command at ${filePath} is missing required properties.`);
    }
}

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

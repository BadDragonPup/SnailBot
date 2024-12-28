import { Command } from './command';
import { Message, TextChannel } from 'discord.js';

export const commands = new Map<string, Command>();

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
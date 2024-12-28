import { Message, TextChannel } from 'discord.js';
import { commands, loadCommands } from '../commands/index';
import Logger from '../utils/logger';

const logger = Logger.getInstance();

loadCommands();

const cooldowns: Record<string, Record<string, number>> = {};

export function handleMessage(message: Message) {
    if (message.author.bot) return;

    const prefix = '/'; // Change prefix to '/'
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (commandName && commands[commandName]) {
        const command = commands[commandName];

        // Check for permissions
        if (command.permissions) {
            const authorPerms = (message.channel as TextChannel).permissionsFor(message.author);
            if (!authorPerms || !command.permissions.every(perm => authorPerms.has(perm))) {
                return message.reply('You do not have permission to use this command.');
            }
        }

        // Check for cooldowns
        if (!cooldowns[commandName]) {
            cooldowns[commandName] = {};
        }

        const now = Date.now();
        const timestamps = cooldowns[commandName];
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps[message.author.id]) {
            const expirationTime = timestamps[message.author.id] + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${commandName}\` command.`);
            }
        }

        timestamps[message.author.id] = now;
        setTimeout(() => delete timestamps[message.author.id], cooldownAmount);

        // Execute the command
        try {
            command.execute(args, message); // Fix: Swap the order of arguments
        } catch (error) {
            logger.error(`Error executing command ${commandName}:`, error as Error); // Fix: Cast error to Error
            message.reply('There was an error executing that command.');
        }
    }
}

export interface CommandInterface {
    permissions?: import('discord.js').PermissionResolvable[];
    aliases?: string[];
    cooldown?: number;
    execute: (args: string[], message: Message) => void;
}

import { Command } from './command';
import * as fs from 'fs';
import * as path from 'path';

export const commands: { [key: string]: Command } = {};

export function loadCommands(): void {
    const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.ts') && file !== 'index.ts' && file !== 'command.ts');

    for (const file of commandFiles) {
        const commandModule = require(path.join(__dirname, file));
        const command: Command = commandModule[Object.keys(commandModule)[0]];
        if (command && command.name) {
            commands[command.name] = command;
            if (command.aliases) {
                for (const alias of command.aliases) {
                    commands[alias] = command;
                }
            }
        }
    }
}
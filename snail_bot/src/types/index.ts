import { Message, PermissionResolvable } from 'discord.js';

export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    permissions?: PermissionResolvable[];
    cooldown?: number;
    execute(args: string[], message: Message): Promise<void>;
}

export interface Event {
    name: string;
    execute(...args: any[]): Promise<void>;
}
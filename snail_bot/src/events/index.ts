import { Client } from 'discord.js';
import { handleMessage } from './message';

export function loadEvents(client: Client) {
    client.on('messageCreate', handleMessage);
}
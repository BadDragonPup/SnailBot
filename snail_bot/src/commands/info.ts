import { Command } from './command';
import { Message, TextChannel, ChannelType } from 'discord.js';

export const infoCommand: Command = {
    name: 'info',
    description: 'Description of the Info command',
    execute: (args: string[], message: Message) => {
        const botInfo = `
**SnailBot Functions:**
- **!info**: Provides information about the bot's functions.
- **!help**: Lists all available commands and their descriptions.
- **!ping**: Checks the bot's response time to the server.
- **!stats**: Displays statistics about the server.
- **!play [url]**: Plays audio from the provided URL in a voice channel.
- **!stop**: Stops the currently playing audio.
- **!skip**: Skips the current audio track.
- **!queue**: Shows the current audio queue.
- **!ban [user]**: Bans the mentioned user from the server.
- **!kick [user]**: Kicks the mentioned user from the server.
- **!mute [user]**: Mutes the mentioned user in the server.
- **!unmute [user]**: Unmutes the mentioned user in the server.
- **!pause**: Pauses the currently playing audio.
- **!resume**: Resumes the paused audio.
- **!volume [level]**: Sets the volume level of the audio.
- **!clear**: Clears the current audio queue.
- **!loop**: Toggles looping of the current audio track.
- **!np**: Shows the currently playing track.
- **!shuffle**: Shuffles the current audio queue.
`;
        if (message.channel.type === ChannelType.GuildText) {
            (message.channel as TextChannel).send('Info command executed.');
            (message.channel as TextChannel).send(botInfo);
        }
    },
};
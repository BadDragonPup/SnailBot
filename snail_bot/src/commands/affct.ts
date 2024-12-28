import { TextChannel, ChannelType, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Logger from '../utils/logger';

interface AFFCT {
    ART: number;
    FAME: number;
    FTH: number;
    CIV: number;
    TECH: number;
}

export class AFFCTCommand {
    private totals: AFFCT;
    private logger = Logger.getInstance();

    constructor() {
        this.totals = { ART: 0, FAME: 0, FTH: 0, CIV: 0, TECH: 0 };
    }

    public add(category: keyof AFFCT, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] += value;
            this.logger.info(`Added ${value} to ${category}. New total: ${this.totals[category]}`);
        } else {
            this.logger.error(`Invalid category: ${category}`);
        }
    }

    public subtract(category: keyof AFFCT, value: number): void {
        if (this.totals[category] !== undefined) {
            this.totals[category] -= value;
            this.logger.info(`Subtracted ${value} from ${category}. New total: ${this.totals[category]}`);
        } else {
            this.logger.error(`Invalid category: ${category}`);
        }
    }

    public getTotal(category: keyof AFFCT): number {
        if (this.totals[category] !== undefined) {
            return this.totals[category];
        } else {
            this.logger.error(`Invalid category: ${category}`);
            return 0;
        }
    }

    public getAllTotals(): AFFCT {
        return this.totals;
    }

    public getTotalSum(): number {
        return Object.values(this.totals).reduce((sum, value) => sum + value, 0);
    }
}

const affctCommandInstance = new AFFCTCommand();

export default {
    data: new SlashCommandBuilder()
        .setName('affct')
        .setDescription('Description of the AFFCT command')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The category to modify')
                .setRequired(true)
                .addChoices(
                    { name: 'ART', value: 'ART' },
                    { name: 'FAME', value: 'FAME' },
                    { name: 'FTH', value: 'FTH' },
                    { name: 'CIV', value: 'CIV' },
                    { name: 'TECH', value: 'TECH' }
                )
        )
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('The value to add or subtract')
                .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        const category = (interaction.options as CommandInteractionOptionResolver).getString('category', true) as keyof AFFCT;
        const value = (interaction.options as CommandInteractionOptionResolver).getInteger('value', true);

        if (interaction.channel?.type === ChannelType.GuildText) {
            affctCommandInstance.add(category, value);
            await interaction.reply({ content: `Added ${value} to ${category}.`, ephemeral: true });
        } else {
            await interaction.reply({ content: 'This command can only be used in a text channel.', ephemeral: true });
        }
    },
};

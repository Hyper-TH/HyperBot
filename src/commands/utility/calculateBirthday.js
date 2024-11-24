const { SlashCommandBuilder } = require('discord.js');

const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const command = new SlashCommandBuilder()
    .setName('calculatebirthday')
    .setDescription('Calculate what day your birthday is in X years')
    .addStringOption(option =>
        option.setName('date')
        .setDescription('The date you want to compare (YYYY-MM-DD)')
        .setRequired(true))
    .addNumberOption(option => 
        option.setName('num')
        .setDescription('amount of years')
        .setRequired(true));

const calculate = (dateStr, years) => {
    dateStr.setFullYear(dateStr.getFullYear() + years);
    const day = daysArr[dateStr.getDay()];

    return day;
};

module.exports = {
    data: command,
    execute: async (interaction) => {
        const dateStr = new Date(interaction.options.getString('date'));
        const num = interaction.options.getNumber('num');

        if (isNaN(dateStr.getTime())) {
            return interaction.reply('Invalid date format.')
        }

        const day = calculate(dateStr, num);

        await interaction.reply(`${day}`);
    }
}
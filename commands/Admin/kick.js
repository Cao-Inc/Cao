const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick command'),
	async execute(interaction) {
		await interaction.reply('Kick command');
	},
};
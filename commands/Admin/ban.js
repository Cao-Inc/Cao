const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban command'),
	async execute(interaction) {
		await interaction.reply('Ban command');
	},
};
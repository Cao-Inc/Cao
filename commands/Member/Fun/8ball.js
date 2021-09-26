const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('8ball')
		.setDescription('8ball command'),
	async execute(interaction) {
		await interaction.reply('8ball command');
	},
};
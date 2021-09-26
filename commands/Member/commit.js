const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');
const Player = require('../../player');

const db = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commit')
		.setDescription('Commit command'),
	async execute(interaction) {
		const player = new Player(interaction.user, 50000, Date.now());
		db.set(player.user.id, player)
			.then(() => console.log('ok'));
		await interaction.reply('Committed');
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');

const Player = require('../../player');
const helper = require('../../helper');
const { REPLIT_DB_URL } = require('../../config.json');

const db = new Database(REPLIT_DB_URL);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('Coins cmd'),

	async execute(interaction) {
		db.get(interaction.user.id)
			.then(async (player) => {
				await interaction.reply(`Your coins: ${player.coins}`);
			})
			.catch(async (err) => {
				await helper.createDataForNewPlayer(interaction.user);
				await interaction.reply('Welcome, your newbie coins: **50000**!');
			});


	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');

const helper = require('../../helper');
const _db = require('../../_db');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('Coins cmd'),

	async execute(interaction) {
		_db.get(interaction.user.id)
			.then(async (player) => {
				if (player) {
					await interaction.reply(`Your coins: ${player.coins}`);
				}
				else {
					await helper.createDataForNewPlayer(interaction.user);
					await interaction.reply('Welcome, your newbie coins: **50000**!');
				}
			});
	},
};
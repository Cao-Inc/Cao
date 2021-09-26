const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');

const { REPLIT_DB_URL } = require('../../config.json');
const helper = require('../../helper');

const db = new Database(REPLIT_DB_URL);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dl')
		.setDescription('Receive daily reward!'),

	async execute(interaction) {
		const today = new Date(Date.now());
		db.get(interaction.user.id)
			.then(async (player) => {
				const playerLastReceiveDailyReward = new Date(player.lastReceiveDailyReward);

				if (playerLastReceiveDailyReward.getDate() === today.getDate()) {
					await interaction.reply('You received today reward.');
					return;
				}

				const dailyCoins = Math.floor(Math.random() * 40000) + 10000;

				await helper.giveCoinsTo(interaction.user.id, dailyCoins);
				await helper.updateLastReceiveDailyReward(interaction.user.id, today);
				await interaction.reply(`Your daily reward: ${dailyCoins}`);
			})
			.catch(async (err) => {
				await helper.createDataForNewPlayer(interaction.user);
				await interaction.reply('Welcome, your newbie coins: **50000**!');
				const dailyCoins = Math.floor(Math.random() * 40000) + 10000;

				await helper.giveCoinsTo(interaction.user.id, dailyCoins);
				await helper.updateLastReceiveDailyReward(interaction.user.id, today);
				await interaction.editReply(`Your daily reward: ${dailyCoins}`);
			});
	},
};
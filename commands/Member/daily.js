const { SlashCommandBuilder } = require('@discordjs/builders');

const helper = require('../../helper');
const _db = require('../../_db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Receive daily reward!'),

	async execute(interaction) {
		const today = new Date(Date.now());
		_db.get(interaction.user.id)
			.then(async (player) => {
				if (!player) {
					await helper.createDataForNewPlayer(interaction.user);
					await interaction.reply('Welcome, your newbie coins: **50000**!');

					const dailyCoins = Math.floor(Math.random() * 40000) + 10000;
					const totalCoins = 50000 + dailyCoins;

					await helper.updatePlayerData(interaction.user.id, {
						coins: totalCoins,
						lastReceiveDailyReward: today,
					});

					setTimeout(async () => {
						await interaction.editReply(`Your daily reward: ${dailyCoins}\nTotal coins: ${totalCoins}`);
					}, 1000);

					return;
				}

				const playerLastReceiveDailyReward = new Date(player.lastReceiveDailyReward);

				if (playerLastReceiveDailyReward.getDate() === today.getDate()) {
					await interaction.reply('You received today reward.');
					return;
				}

				const dailyCoins = Math.floor(Math.random() * 40000) + 10000;
				const totalCoins = player.coins + dailyCoins;

				await helper.updatePlayerData(interaction.user.id, {
					coins: totalCoins,
					lastReceiveDailyReward: today,
				});
				await interaction.reply(`Your daily reward: ${dailyCoins}.\nTotal coins: ${totalCoins}`);
			});
	},
};
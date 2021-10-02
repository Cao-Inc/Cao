const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

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
					const embed = new MessageEmbed()
						.setDescription('Welcome new player, give you **50000** <:coin:893675328273252362> to drink milk tea! <:KannaSip:880852779386699826>')
						.setColor('#57EDAC')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Welcome, your newbie coins: **50000**!');

					const dailyCoins = Math.floor(Math.random() * 40000) + 10000;
					const totalCoins = 50000 + dailyCoins;

					await helper.updatePlayerData(interaction.user.id, {
						coins: totalCoins,
						lastReceiveDailyReward: today,
					});

					setTimeout(async () => {
						const embed2 = new MessageEmbed()
							.setDescription(`Your daily reward: **${dailyCoins}** <:coin:893675328273252362>.\n<:balance:893671642650267758> Your balance: ${totalCoins} <:coin:893675328273252362>`)
							.setColor('#57EDAC')
							.setFooter('From Cáo 298 With Love ')
							.setTimestamp();
						await interaction.reply({ embeds: [embed2] });
						// await interaction.editReply(`Your daily reward: ${dailyCoins}\nTotal coins: ${totalCoins}`);
					}, 1000);

					return;
				}

				const playerLastReceiveDailyReward = new Date(player.lastReceiveDailyReward);

				if (playerLastReceiveDailyReward.getDate() === today.getDate()) {
					const embed = new MessageEmbed()
						.setDescription('You received today reward.')
						.setColor('#FF0000')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('You received today reward.');
					return;
				}

				const dailyCoins = Math.floor(Math.random() * 40000) + 10000;
				const totalCoins = player.coins + dailyCoins;

				await helper.updatePlayerData(interaction.user.id, {
					coins: totalCoins,
					lastReceiveDailyReward: today,
				});
				const embed = new MessageEmbed()
					.setDescription(`Your daily reward: **${dailyCoins}** <:coin:893675328273252362>.\n<:balance:893671642650267758> Your balance: ${totalCoins} <:coin:893675328273252362>`)
					.setColor('#57EDAC')
					.setFooter('From Cáo 298 With Love ')
					.setTimestamp();
				await interaction.reply({ embeds: [embed] });
				// await interaction.reply(`Your daily reward: **${dailyCoins}** <:coin:893675328273252362>.\n<:balance:893671642650267758> Your balance: ${totalCoins} <:coin:893675328273252362>`);
			});
	},
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const helper = require('../../helper');
const _db = require('../../_db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Bố thí cho ai đó')
		.addUserOption(user =>
			user
				.setName('receiver')
				.setDescription('Người được bố thí')
				.setRequired(true),
		)
		.addNumberOption(coins =>
			coins
				.setName('coins')
				.setDescription('Bố thí bao nhiêu coins?')
				.setRequired(true),
		),

	async execute(interaction) {
		const receiver = interaction.options.getUser('receiver');
		const coins = interaction.options.getNumber('coins');

		if (interaction.user.id === receiver.id) {
			const embed = new MessageEmbed()
				.setDescription('Không thể tự bố thí cho bản thân!')
				.setColor('#FF0000')
				.setFooter('From Cáo 298 With Love ')
				.setTimestamp();
			await interaction.reply({ embeds: [embed] });
			// await interaction.reply('Không thể tự bố thí cho bản thân');
			return;
		}

		_db.get(interaction.user.id)
			.then(async (senderData) => {
				if (!senderData) {
					await helper.createDataForNewPlayer(interaction.user);
					const embed = new MessageEmbed()
						.setDescription('Welcome new player, give you **50000** <:coin:893675328273252362>\nTry give one more time?')
						.setColor('#57EDAC')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Welcome, your newbie coins: **50000**!\nTry give one more time?');
					return;
				}

				if (coins <= 0) {
					const embed = new MessageEmbed()
						.setDescription('Please enter a valid amount of coins.')
						.setColor('#FF0000')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Please enter a valid amount of coins.');
					return;
				}

				if (coins > senderData.coins) {
					const embed = new MessageEmbed()
						.setDescription('Bạn không có đủ <:coin:893675328273252362>!')
						.setColor('#FF0000')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Bạn không có đủ coins');
					return;
				}

				_db.get(receiver.id)
					.then(async (receiverData) => {
						if (!receiverData) {
							const embed = new MessageEmbed()
								.setDescription(`${receiver} chưa tham gia game!`)
								.setColor('#FF0000')
								.setFooter('From Cáo 298 With Love ')
								.setTimestamp();
							await interaction.reply({ embeds: [embed] });
							// await interaction.reply(`Member ${receiver} chưa tham gia game`);
							return;
						}

						await helper.updatePlayerData(senderData.user.id, { coins: senderData.coins - coins });
						await helper.updatePlayerData(receiverData.user.id, { coins: receiverData.coins + coins });
						const embed = new MessageEmbed()
							.setDescription(`<@${senderData.user.id}> bố thí cho <@${receiverData.user.id}> **${coins}** <:coin:893675328273252362>.`)
							.setColor('#32FF00')
							.setFooter('From Cáo 298 With Love ')
							.setTimestamp();
						await interaction.reply({ embeds: [embed] });
						// await interaction.reply(`<@${senderData.user.id}> bố thí cho <@${receiverData.user.id}> **${coins}** coins.`);
					});
			});
	},
};
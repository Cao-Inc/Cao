const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const helper = require('../../helper');
const _db = require('../../_db');

const genEmbed = (msg, color) => {
	const embed = new MessageEmbed()
		.setDescription(msg)
		.setColor(color)
		.setFooter('From Cáo 298 With Love ')
		.setTimestamp();

	return embed;
};

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
			const embed = helper.genEmbed(
				'Không thể tự bố thí cho bản thân!',
				'#FF0000',
			);
			await interaction.reply({ embeds: [embed] });
			// await interaction.reply('Không thể tự bố thí cho bản thân');
			return;
		}

		_db.get(interaction.user.id)
			.then(async (senderData) => {
				if (!senderData) {
					await helper.createDataForNewPlayer(interaction.user);
					const embed = genEmbed(
						'Welcome new player, give you **50000** <:coin:893675328273252362>\nTry give one more time?',
						'#57EDAC',
					);
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Welcome, your newbie coins: **50000**!\nTry give one more time?');
					return;
				}

				if (coins <= 0) {
					const embed = new genEmbed(
						'Please enter a valid amount of coins.',
						'#FF0000',
					);
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Please enter a valid amount of coins.');
					return;
				}

				if (coins > senderData.coins) {
					const embed = new genEmbed(
						'Bạn không có đủ <:coin:893675328273252362>!',
						'#FF0000',
					);
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Bạn không có đủ coins');
					return;
				}

				_db.get(receiver.id)
					.then(async (receiverData) => {
						if (!receiverData) {
							const embed = new genEmbed(
								`${receiver} chưa tham gia game!`,
								'#FF0000',
							);
							await interaction.reply({ embeds: [embed] });
							// await interaction.reply(`Member ${receiver} chưa tham gia game`);
							return;
						}

						await helper.updatePlayerData(senderData.user.id, { coins: senderData.coins - coins });
						await helper.updatePlayerData(receiverData.user.id, { coins: receiverData.coins + coins });
						const embed = new genEmbed(
							`<@${senderData.user.id}> bố thí cho <@${receiverData.user.id}> **${coins}** <:coin:893675328273252362>.`,
							'#32FF00',
						);
						await interaction.reply({ embeds: [embed] });
						// await interaction.reply(`<@${senderData.user.id}> bố thí cho <@${receiverData.user.id}> **${coins}** coins.`);
					});
			});
	},
};
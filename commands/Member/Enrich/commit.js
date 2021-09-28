const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment-timezone');

const _db = require('../../../_db');
const helper = require('../../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commit')
		.setDescription('Commit command')
		.addStringOption(string =>
			string
				.setName('bettype')
				.setDescription('Bet type')
				.setRequired(true)
				.addChoice('Số học', 'sh')
				.addChoice('Giải tích', 'gt'),
		)
		.addNumberOption(number =>
			number
				.setName('number')
				.setDescription('Mã số dự thi')
				.setRequired(true),
		)
		.addNumberOption(coins =>
			coins
				.setName('coins')
				.setDescription('Lệ phí')
				.setRequired(true),
		),
	async execute(interaction) {
		_db.get(interaction.user.id).then(async (player) => {
			if (!player) {
				await helper.createDataForNewPlayer(interaction.user);
				await interaction.reply('Welcome, your newbie coins: **50000**!');
				return;
			}

			const hour = moment().hour();
			if (hour >= 18) {
				await interaction.reply('Đã hết thời gian nộp bài hôm nay.');
				return;
			}

			const betType = interaction.options.getString('bettype');
			const number = interaction.options.getNumber('number');
			const coins = interaction.options.getNumber('coins');

			if (number < 0 || number > 99) {
				await interaction.reply('Sai mã dự thi.\nMã đúng: từ 00 đến 99');
				return;
			}

			if (coins < 1000 || coins > 50000) {
				await interaction.reply('Lệ phí dự thi không đúng.\nLệ phí: từ 1000 coins đến 50000 coins');
				return;
			}

			if (coins > player.coins) {
				await interaction.reply('Bạn không có đủ coins');
				return;
			}

			const today = moment().format('DD-MM-YYYY');
			await helper.addCommit(today, interaction.user.id, betType, number, coins);
			await helper.updatePlayerData(player.user.id, { coins: player.coins - coins });

			await interaction.reply(`${interaction.user} dự thi thành công mã số **${number}** với lệ phí **${coins}** coins.`);
		});
	},
};
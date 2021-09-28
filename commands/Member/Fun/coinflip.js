const { SlashCommandBuilder } = require('@discordjs/builders');

const _db = require('../../../_db');
const helper = require('../../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a coin and you win!')
		.addNumberOption(coins =>
			coins
				.setName('coins')
				.setDescription('You want to win that amounts of coins')
				.setRequired(true),
		)
		.addStringOption(string =>
			string
				.setName('side')
				.setDescription('Choose tail or head.\nDefault value: tail')
				.addChoice('tail', 'tail')
				.addChoice('head', 'head'),
		),
	async execute(interaction) {
		const coins = interaction.options.getNumber('coins');
		const side = interaction.options.getString('side') || 'tail';

		_db.get(interaction.user.id)
			.then(async (player) => {
				if (!player) {
					await helper.createDataForNewPlayer(interaction.user);
					await interaction.reply('Welcome, your newbie coins: **50000**!\nLet flip that coin one more time.');
					return;
				}

				if (coins <= 0) {
					await interaction.reply('Please enter a valid amount of coins.');
					return;
				}

				if (coins > player.coins) {
					await interaction.reply('Bạn làm đíu có đủ coins =))).');
					return;
				}

				if (coins > 100000) {
					await interaction.reply('Max coins: 100000');
					return;
				}

				let msg = 'Chúc mừng bạn đã';
				const myChoice = helper.randomChoice(['tail', 'head']);
				if (side === myChoice) {
					msg += ` thắng **${coins}** coins.`;
					await helper.updatePlayerData(interaction.user.id, { coins: player.coins + coins });
				}
				else {
					msg += ` thua **${coins}** coins.`;
					await helper.updatePlayerData(interaction.user.id, { coins: player.coins - coins });
				}
				await interaction.reply(msg);

			});

	},
};
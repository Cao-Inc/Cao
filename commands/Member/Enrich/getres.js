const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const { api_xoso_me_URL } = require('../../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getres')
		.setDescription('Xem kết quả mới nhất của BTC'),
	async execute(interaction) {
		axios.get(api_xoso_me_URL)
			.then(async (res) => {
				let db;
				if (res.data.data.lottery.mb.lotData.DB[0].length > 0) {
					db = res.data.data.lottery.mb.lotData.DB[0].slice(-2);
				}
				else {
					db = '-';
				}
				let msg = `DB: ${db}\n----------------------------`;
				for (let i = 0; i < 10; i++) {
					msg += `\n\t${i}:\t`;
					if (res.data.data.lottery.mb.dau[i].length > 0) {
						msg += `${i}${res.data.data.lottery.mb.dau[i].join(` ${i}`)}`;
					}
					else {
						msg += '-';
					}
				}
				await interaction.reply(msg);
			})
			.catch(async (err) => {
				console.log(err);
				await interaction.reply('Failed! Pls try again later.');
			});
	},
};
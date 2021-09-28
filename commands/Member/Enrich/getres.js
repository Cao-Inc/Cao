const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const { api_xoso_me_URL } = require('../../../config.json');
const helper = require('../../../helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getres')
		.setDescription('Xem kết quả mới nhất của BTC'),
	async execute(interaction) {
		axios.get(api_xoso_me_URL)
			.then(async (res) => {
				const { db, sh } = helper.parseAPIxoso(res);

				let msg = `DB: ${db}\n----------------------------`;

				for (let i = 0; i < 10; i++) {
					msg += `\n\t${i}:\t`;
					msg += (sh[i] !== '-') ? sh[i].join(' ') : sh[i];
				}

				await interaction.reply(msg);
			})
			.catch(async (err) => {
				console.log(err);
				await interaction.reply('Failed! Pls try again later.');
			});
	},
};
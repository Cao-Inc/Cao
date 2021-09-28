const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const moment = require('moment-timezone');

const { gameChannelId, api_xoso_me_URL, rateSH, rateGT } = require('../../config.json');
const _db = require('../../_db');
const helper = require('../../helper');
const PlayerCommit = require('../../models/playerCommit');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('calc')
		.setDescription('Calc()'),
	async execute(interaction) {
		const gameChannel = await interaction.guild.channels.fetch(gameChannelId);

		const res = await axios.get(api_xoso_me_URL);
		const { db, loto } = helper.parseAPIxoso(res);

		const today = moment().format('DD-MM-YYYY');
		_db.get(today)
			.then(async (allCommits) => {
				if (!allCommits) {
					await gameChannel.send(`Ngày ${today} không có học viên nào đỗ kỳ thi.`);
					return;
				}

				let totalWonCoins = 0;

				for (const discordId in allCommits) {
					const playerCommits = new PlayerCommit(allCommits[discordId].sh, allCommits[discordId].gt);

					for (const number in playerCommits.sh) {
						const coins = playerCommits.sh[number];
						totalWonCoins += rateSH * coins * loto.filter(value => value === number).length;
					}

					for (const number in playerCommits.gt) {if (number === db) totalWonCoins += rateGT * playerCommits.gt[number];}
				}

				await interaction.reply(`totalWonCoins: ${totalWonCoins}`);
			})
			.catch(async (err) => {
				console.log(err);
				await interaction.reply('Failed. Pls try again later.');
			});
	},
};
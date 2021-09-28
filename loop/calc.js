const moment = require('moment-timezone');
const axios = require('axios');

const { guildId, gameChannelId, api_xoso_me_URL, rateGT, rateSH } = require('../config.json');
const _db = require('../_db');
const helper = require('../helper');
const PlayerCommit = require('../models/playerCommit');

module.exports = async (client) => {
	const guild = await client.guilds.fetch(guildId);
	const gameChannel = await guild.channels.fetch(gameChannelId);

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
				let playerWonCoins = 0;
				const playerCommits = new PlayerCommit(allCommits[discordId].sh, allCommits[discordId].gt);

				for (const number in playerCommits.sh) {
					const coins = playerCommits.sh[number];
					playerWonCoins += rateSH * coins * loto.filter(value => value === number).length;
				}

				for (const number in playerCommits.gt) {
					if (number === db) playerWonCoins += rateGT * playerCommits.gt[number];
				}

				playerCommits.addWonCoins(playerWonCoins);
				totalWonCoins += playerWonCoins;
				allCommits[discordId] = playerCommits;
			}

			if (totalWonCoins === 0) {
				await gameChannel.send(`Ngày ${today} không có học viên nào đỗ kỳ thi.`);
				return;
			}

			await _db.set(today, allCommits);

			let msg = `Kết quả trúng tuyển ngày ${moment().format('DD-MM-YYYY')}`;
			for (const discordId in allCommits) {
				if (allCommits[discordId].wonCoins > 0) {
					const wonCoins = allCommits[discordId].wonCoins;
					const player = await _db.get(discordId);
					const user = await guild.client.users.fetch(discordId);
					msg += `\n${user} trúng ${wonCoins} coins.`;
					await helper.updatePlayerData(discordId, { coins: player.coins + wonCoins });
				}
			}

			await gameChannel.send(msg);
		});
};
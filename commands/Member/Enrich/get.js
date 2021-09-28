const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment-timezone');

const _db = require('../../../_db');
const PlayerCommit = require('../../../models/playerCommit');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get')
		.setDescription('Xem bài dự thi hôm nay')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('Xem bài dự thi của cháu này')
				.setRequired(false),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user') || interaction.user;
		const today = moment().format('DD-MM-YYYY');
		_db.get(today)
			.then(async (allCommits) => {
				if (!allCommits) {
					await interaction.reply(`${user} không tham dự thi ngày ${today}`);
					return;
				}

				if (!allCommits[user.id]) {
					await interaction.reply(`${user} không tham dự thi ngày ${today}`);
					return;
				}

				const userCommits = new PlayerCommit(allCommits[user.id].sh, allCommits[user.id].gt);
				let msg = `Danh sách dự thi của ${user}\nSố học:`;
				for (const key in userCommits.sh) msg += ` ${key} ${userCommits.sh[key]} `;
				msg += '\nGiải tích:';
				for (const key in userCommits.gt) msg += ` ${key} ${userCommits.gt[key]} `;
				await interaction.reply(msg);
			});
	},
};
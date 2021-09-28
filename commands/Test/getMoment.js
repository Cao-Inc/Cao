const { SlashCommandBuilder } = require('@discordjs/builders');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Vietnam');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moment')
		.setDescription('Replies with new Date()'),
	async execute(interaction) {
		await interaction.reply(moment().format());
	},
};
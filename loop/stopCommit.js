const { guildId, gameChannelId } = require('../config.json');
const moment = require('moment-timezone');

module.exports = async (client) => {
	const guild = await client.guilds.fetch(guildId);
	const gameChannel = await guild.channels.fetch(gameChannelId);
	await gameChannel.send(`Cuộc thi ngày ${moment().format('DD-MM-YYYY')}: Hết giờ nộp bài.`);
};
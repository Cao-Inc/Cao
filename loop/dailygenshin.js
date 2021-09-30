const { guildId, gameChannelId } = require('../config.json');

module.exports = async (client) => {
	const guild = await client.guilds.fetch(guildId);
	const gameChannel = await guild.channels.fetch(gameChannelId);
	await gameChannel.send('c!daily');
};
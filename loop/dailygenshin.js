const { guildId, gameChannelId } = require('../config.json');

module.exports = async (client) => {
	const guild = await client.guilds.fetch(guildId);
	const gameChannel = await guild.channels.fetch(gameChannelId);
	await gameChannel.send('<@645935635252641793> điểm danh kìa <:worrynaku:881454896862359564>');
};
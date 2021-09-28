const { guildId, gameChannelId } = require('../config.json');

async function calc(client) {
	const guild = await client.guilds.fetch(guildId);
	const gameChannel = await guild.channels.fetch(gameChannelId);
}

module.exports = calc;
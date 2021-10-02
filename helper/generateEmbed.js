const { MessageEmbed } = require('discord.js');


module.exports = (msg, color, footer = 'From Cáo 298 With Love ') => {
	const embed = new MessageEmbed()
		.setDescription(msg)
		.setColor(color)
		.setFooter(footer)
		.setTimestamp();

	return embed;
};
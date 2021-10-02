const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tickle')
		.setDescription('tickle someone!')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('User to tickle')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		axios.get('https://nekos.life/api/v2/img/tickle')
			.then(async function(res) {
				const embed = new MessageEmbed()
					.setDescription(`${interaction.user} tickles ${user}! O ω O!`)
					.setColor('#ff0000')
					.setFooter('From Cáo 298 With Love ')
					.setImage(`${res.data.url}`)
					.setTimestamp();
				await interaction.reply({ embeds: [embed] });
			});
		// .catch(err => say('Error'))
	},
};

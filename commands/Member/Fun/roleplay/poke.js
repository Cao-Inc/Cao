const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke')
		.setDescription('poke someone!')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('User to poke')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		axios.get('https://nekos.life/api/v2/img/poke')
			.then(async function(res) {
				const embed = new MessageEmbed()
					.setDescription(`${user} got poked by ${interaction.user} 〃ω〃`)
					.setColor('#ff0000')
					.setFooter('From Cáo 298 With Love ')
					.setImage(`${res.data.url}`)
					.setTimestamp();
				await interaction.reply({ embeds: [embed] });
			});
		// .catch(err => say('Error'))
	},
};

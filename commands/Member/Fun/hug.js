const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hug')
		.setDescription('Hug someone!')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('User to hug')
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		// const embed = new Discord.RichEmbed()
		// .setTitle(`${interaction.user} has hugged ${user}`)
		// // .setColor('#ff0000')
		// .setFooter("From Cáo 298 With Love ")
		// .setImage(`${res.data.url}`)
		// .setTimestamp();

		async function say(msg) {
			await interaction.reply(msg);
		}

		axios.get('https://nekos.life/api/v2/img/hug')
			.then(async function(res) {
				const embed = new MessageEmbed()
					.setDescription(`${interaction.user} has hugged ${user}`)
					.setColor('#ff0000')
					.setFooter('From Cáo 298 With Love ')
					.setImage(`${res.data.url}`)
					.setTimestamp();
				await interaction.reply({ embeds: [embed] });
			});
		// .catch(err => say('Error'))
	},
};

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const helper = require('../../helper');
const _db = require('../../_db');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Balance cmd'),

	async execute(interaction) {
		_db.get(interaction.user.id)
			.then(async (player) => {
				if (player) {
					const embed = new MessageEmbed()
						.setDescription(`<:balance:893671642650267758> You has: ${player.coins} <:coin:893675328273252362>`)
						.setColor('#58ED57')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply(`Your coins: ${player.coins}`);
				}
				else {
					await helper.createDataForNewPlayer(interaction.user);
					const embed = new MessageEmbed()
						.setDescription('Welcome new player, give you **50000** <:coin:893675328273252362> to drink milk tea! <:KannaSip:880852779386699826>')
						.setColor('#58ED57')
						.setFooter('From Cáo 298 With Love ')
						.setTimestamp();
					await interaction.reply({ embeds: [embed] });
					// await interaction.reply('Welcome, your newbie coins: **50000**!');
				}
			});
	},
};
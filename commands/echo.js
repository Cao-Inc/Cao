const discordjs = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echo message to a specific channel')
		.addChannelOption(channel =>
			channel
				.setName('destination')
				.setDescription('Destination channel')
				.setRequired(true),
		)
		.addStringOption(string =>
			string
				.setName('msg')
				.setDescription('Message to send')
				.setRequired(true)),
	async execute(interaction) {
		const channel = interaction.options.getChannel('destination');
		const msg = interaction.options.getString('msg');
		await channel.send(msg);
		await interaction.reply(`Sent \`${msg}\` to ${channel}`);
	},
};
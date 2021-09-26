const ms = require('ms');
const discordjs = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmute a member')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('User to unmute')
				.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		const targetUser = interaction.guild.members.cache.find(member => member.id === user.id);
		const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

		try {
			targetUser.roles.remove(mutedRole);
			await interaction.reply(`User <@${user.id}> has been unmuted`);
		}
		catch (error) {
			console.error(`Error when trying to unmute ${user.id}\n`, error);
			await interaction.reply('Something wrong!');
		}
	},
};
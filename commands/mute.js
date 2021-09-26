const ms = require('ms');
const discordjs = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute a memnber')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('User to mute')
				.setRequired(true),
		)
		.addStringOption(string =>
			string
				.setName('duration')
				.setDescription('Duration')
				.setRequired(false))
		.addStringOption(string =>
			string
				.setName('reason')
				.setDescription('Reason')
				.setRequired(false)),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const duration = interaction.options.getString('duration');
		const reason = interaction.options.getString('reason');

		const targetUser = interaction.guild.members.cache.find(member => member.id === user.id);
		const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');

		try {
			let msg = `User <@${user.id}> has been muted`;

			targetUser.roles.add(mutedRole);

			if (duration) {
				msg += ` for \`${ms(ms(duration))}.\``;
				setTimeout(() => {
					targetUser.roles.remove(mutedRole);
				}, ms(duration));
			}

			if (reason) msg += ` Reason: \`${reason}\``;

			await interaction.reply(msg);
		}
		catch (error) {
			console.error(`Error when trying to mute ${user.id}\n`, error);
			await interaction.reply('Something wrong!');
		}

	},
};
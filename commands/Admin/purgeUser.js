const { SlashCommandBuilder } = require('@discordjs/builders');
const _db = require('../../_db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purgeuser')
		.setDescription('Không sờ khi không biết để làm gì')
		.addUserOption(user =>
			user
				.setName('user')
				.setDescription('Delete this user from my database')
				.setRequired(true),
		),
	async execute(interaction) {
		const key = interaction.options.getUser('user').id;
		_db.delete(key)
			.then(async () => {
				await interaction.reply({ content:'<:worrynaku:881454896862359564>', ephemeral: true });
			})
			.catch(async (err) => {
				console.error(`Failed when purge key: ${key}\n------------------------------------\n${err}`);
				await interaction.reply({ content: `There is no key: ${key}`, ephemeral: true });
			});
	},
};
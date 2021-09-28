const { SlashCommandBuilder } = require('@discordjs/builders');
const _db = require('../../_db');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cldb')
		.setDescription('Không sờ khi không biết để làm gì'),
	async execute(interaction) {
		_db.list()
			.then(async (keys) => {
				keys.forEach(async (key) => {
					await _db.delete(key);
				});
				await interaction.reply({ content:'<:worrynaku:881454896862359564>', ephemeral: true });
			})
			.catch(async (err) => {
				console.error(`Failed when cldb\n------------------------------------\n${err}`);
				await interaction.reply({ content: 'There is no key anymore', ephemeral: true });
			});
	},
};
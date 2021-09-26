const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { isReplit, clientId, guildId } = require('./config.json');
let { token } = require('./config.json');
const helper = require('./helper');

if (isReplit) {
	token = process.env['tokenCao'];
}

const commands = [];

const pushCommand = (path) => {
	const command = require(`${path}`);
	commands.push(command.data.toJSON());
};

helper.readDir('commands', pushCommand);

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	}
	catch (error) {
		console.error(error);
	}
})();
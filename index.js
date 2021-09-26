// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');

const { isReplit } = require('./config.json');
let { token } = require('./config.json');
const helper = require('./helper');

if (isReplit) {
	token = process.env['tokenCao'];
}

require('./deploy-commands');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const setCommand = (path) => {
	const command = require(`${path}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
};

const setEvent = (path) => {
	const event = require(`${path}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};

helper.readDir('commands', setCommand);
helper.readDir('events', setEvent);

client.login(token);
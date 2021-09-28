const dirTree = require('directory-tree');

const Player = require('../models/player');
const PlayerCommit = require('../models/playerCommit');
const _db = require('../_db');
const parseAPIxoso = require('./parseAPIxoso');

const readDir = (path, callback) => {
	const tree = dirTree(`./${path}/`, { extensions:/\.js$/ });
	tree.children.forEach(child => {
		if (child.children) {
			readDir(child.path, callback);
			return;
		}
		callback(`./${child.path}`);
	});
};

function randomChoice(arr) {
	return arr[Math.floor(arr.length * Math.random())];
}

const updateData = (oldData, newData) => ({
	...oldData,
	...newData,
});

const createDataForNewPlayer = (user) => {
	const newbieCoins = 250000;
	const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
	const player = new Player(user, newbieCoins, yesterday);
	_db.set(player.user.id, player);
	console.log(`Player ${player.user.id} joined game.`);
};

const updatePlayerData = (discordId, newData) => {
	_db.get(discordId)
		.then(player => {
			const updatedData = updateData(player, newData);
			_db.set(discordId, updatedData);
		});
};

const addCommit = (key, discordId, betType, number, coins) => {
	_db.get(key)
		.then((todayCommits) => {
			if (!todayCommits) todayCommits = {};
			if (!todayCommits[discordId]) todayCommits[discordId] = new PlayerCommit();
			else todayCommits[discordId] = new PlayerCommit(todayCommits[discordId].sh, todayCommits[discordId].gt);
			todayCommits[discordId].update(betType, number, coins);
			return todayCommits;
		})
		.then((value) => _db.set(key, value));
};

module.exports = {
	readDir,
	updateData,
	updatePlayerData,
	createDataForNewPlayer,
	randomChoice,
	addCommit,
	parseAPIxoso,
};
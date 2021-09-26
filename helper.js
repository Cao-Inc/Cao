const dirTree = require('directory-tree');
const Player = require('./player');
const Database = require('@replit/database');

const db = new Database();

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

const createDataForNewPlayer = (user) => {
	const newbieCoins = 50000;
	const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date);
	const player = new Player(user, newbieCoins, yesterday);
	db.set(player.user.id, player)
		.then(() => {
			console.log(`Player ${player.user.id} joined game.`);
		})
		.catch(err => {
			console.log(`Failed to create db for player ${player.user.id}`);
			throw err;
		});
};

const giveCoinsTo = (discordId, coins) => {
	db.get(discordId)
		.then(player => {
			player.coins += coins;
			db.set(discordId, player)
				.then(() => {})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		})
		.catch((err) => {
			console.log(`Failed when give coins.\nThere is no player with id: ${discordId}`);
			throw err;
		});
};

const updateLastReceiveDailyReward = (discordId, lastReceiveDailyReward) => {
	db.get(discordId)
		.then(player => {
			player.lastReceiveDailyReward = lastReceiveDailyReward;
			db.set(discordId, player)
				.then(() => {})
				.catch((err) => {
					console.log(err);
					throw err;
				});
		})
		.catch((err) => {
			console.log(`Failed when update lastReceiveDailyReward.\nThere is no player with id: ${discordId}`);
			throw err;
		});
};

module.exports = {
	readDir,
	createDataForNewPlayer,
	giveCoinsTo,
	updateLastReceiveDailyReward,
};
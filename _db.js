const Database = require('@replit/database');
const { REPLIT_DB_URL } = require('./config.json');

const db = new Database(REPLIT_DB_URL);

module.exports = {
	get: (key) => db.get(key),
	set: (key, value) => db.set(key, value),
	delete: (key) => db.delete(key),
	list: () => db.list(),
	listWithPrefix: (prefix) => db.list(prefix),
};
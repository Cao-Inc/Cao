const Database = require('@replit/database');
const { isReplit, REPLIT_DB_URL } = require('./config.json');

let db = new Database(REPLIT_DB_URL);
if (isReplit) db = new Database();

module.exports = {
	get: (key) => db.get(key),
	set: (key, value) => db.set(key, value),
	delete: (key) => db.delete(key),
	list: () => db.list(),
	listWithPrefix: (prefix) => db.list(prefix),
};
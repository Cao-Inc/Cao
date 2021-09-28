const cron = require('node-cron');

const { timezone } = require('../config.json');
const calc = require('./calc');
const stopCommit = require('./stopCommit');

module.exports = (client) => {

	cron.schedule('0 18 * * *', () => {
		stopCommit(client);
	}, {
		scheduled: true,
		timezone: timezone,
	});

	cron.schedule('35 18 * * *', () => {
		calc(client);
	}, {
		scheduled: true,
		timezone: timezone,
	});
};
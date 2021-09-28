module.exports = (res) => {
	const db = (res.data.data.lottery.mb.lotData.DB[0].length > 0) ?
		res.data.data.lottery.mb.lotData.DB[0].slice(-2) : '-';

	const sh = {};
	for (let i = 0; i < 10; i++) {
		sh[i] = (res.data.data.lottery.mb.dau[i].length > 0) ?
			res.data.data.lottery.mb.dau[i].map(value => `${i}${value}`) : '-';
	}

	const loto = res.data.data.lottery.mb.loto;

	return {
		sh,
		db,
		loto,
	};

};
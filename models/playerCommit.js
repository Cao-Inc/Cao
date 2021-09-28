module.exports = class PlayerCommit {
	constructor(sh = {}, gt = {}) {
		this.sh = sh;
		this.gt = gt;
	}

	get totalCoins() {
		let total = 0;
		for (const key in this.sh) total += this.sh[key];
		for (const key in this.gt) total += this.gt[key];
		return total;
	}

	update(type, number, coins) {
		switch (type) {
		case 'sh': {
			this.sh = {
				...this.sh,
				[number]: coins,
			};
			break;
		}
		case 'gt': {
			this.gt = {
				...this.gt,
				[number]: coins,
			};
			break;
		}
		default: {
			console.log(`Failed. There is no bet type: ${type}`);
		}
		}
	}
};
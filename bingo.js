var slots = require('./fixtures'),
	Bingo = function () {};

Bingo.prototype = {
	initialize : function (options) {
		this.sockets = options.sockets;
		this.tick();
	},

	tick : function () {
		setTimeout(this.loop.bind(this), 10 * 1000);		
	},

	loop : function () {
		this.sockets.emit('sync', this.getActiveSlot());
		this.tick();
	},

	getActiveSlot : function () {
		return {
			slot : slots.find(Date.now() / 1000),
			time : Date.now() / 1000
		};
	},

	onSyncRequest : function (cb) {
		cb(this.getActiveSlot());
	}
};

module.exports = new Bingo();
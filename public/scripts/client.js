var Client = function () {};

var p = Client.prototype;

p.initialize = function (options) {
	this._socket = io();
	this._socket.on('sync', this._onSyncRec.bind(this));

	this.flux = options.flux;
	this.sync();
};

p._onSyncRec = function (res) {
	this.flux.actions.syncSlots(res);
};

p.sync = function () {
	this._socket.emit('sync', this._onSyncRec.bind(this));
};

module.exports = Client;
var _ = require('underscore');

var i, slots = [], today, total, duration = 300;

today = new Date().setHours(0,0,0,0) / 1000;
total = 86400 / duration;

for(i = 0; i < total; i++) {	
	slots.push({
		id : i,
		duration : duration,
		startsAt : today + (duration * i),
		endsAt   : today + (duration * i) + duration,
		game : {
			id : i,
			balls : []
		}
	});
}

module.exports = {
	find : function (time) {
		return _.find(slots, function (slot) {
			return slot.endsAt >= time;
		});
	}
}
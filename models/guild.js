const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
	id: String,
	prefix: {
		'type': String,
		'default': '!'
	},
	logChannel: {
		'type': String,
		'default': '946528565271330886'
	}
})

module.exports = mongoose.model('Guild', guildSchema);
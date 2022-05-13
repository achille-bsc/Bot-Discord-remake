const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
  id: String
})

module.exports = mongoose.model('Guild', guildSchema)

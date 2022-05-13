const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
  id: String,
  premium: { type: Boolean, default: false },
  endPremiumTimestamp: { type: Number, default: 0 },
  prefix: { type: String, default: '!' },
  welcomeMessageEnabled: { type: Boolean, default: true },
  welcomeMessage: { type: String, default: '🎉 Bienvenue **{member}** sur le serveur **{server.name}** 🎉' },
  welcomeColor: { type: String, default: 'GREEN' },
  welcomeChannel: { type: String, default: '973164997511352320' },

  goodByeMessageEnabled: { type: Boolean, default: true },
  goodByeMessage: { type: String, default: '**{member}** viens malhereusement de nous quitter 😢' },
  goodByeColor: { type: String, default: 'RED' },
  goodByeChannel: { type: String, default: '973164997511352320' }
})

module.exports = mongoose.model('Guild', guildSchema)

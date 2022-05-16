const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
  id: String,

  // PREFIX
  prefix: { type: String, default: '!' },

  // PREMIUM
  premium: { type: Boolean, default: false },
  endPremiumTimestamp: { type: Number, default: 0 },
  activated: { type: Boolean, default: false },

  // WELCOME
  welcomeMessageEnabled: { type: Boolean, default: true },
  welcomeMessage: { type: String, default: '🎉 Bienvenue **{member}** sur le serveur **{server.name}** 🎉' },
  welcomeColor: { type: String, default: 'GREEN' },
  welcomeChannel: { type: String, default: '973164997511352320' },

  // GOODBYE
  goodByeMessageEnabled: { type: Boolean, default: true },
  goodByeMessage: { type: String, default: '**{member}** viens malhereusement de nous quitter 😢' },
  goodByeColor: { type: String, default: 'RED' },
  goodByeChannel: { type: String, default: '973164997511352320' },

  // PRIVATEROOM
  privateRooms: { type: Array, default: [] },
  rooms: { type: Array, default: [] },
  roomsDeleteTimeInSec: { type: Number, default: 0 },

  // LANGUAGE
  langue: { type: String, default: 'fr' },

  // AUTO MODÉRATION
  autoModActive: { type: Boolean, default: false },
  badWords: { type: Array, default: [] },

  // slash
  slash: { type: Array, default: [] }

})

module.exports = mongoose.model('Guild', guildSchema)

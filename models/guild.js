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
	welcomeChannel: { type: String, default: '' },

	// GOODBYE
	goodByeMessageEnabled: { type: Boolean, default: true },
	goodByeMessage: { type: String, default: '**{member}** viens malhereusement de nous quitter 😢' },
	goodByeColor: { type: String, default: 'RED' },
	goodByeChannel: { type: String, default: '' },

	// PRIVATEROOM
	privateRooms: { type: Array, default: [] },
	rooms: { type: Array, default: [] },
	roomsDeleteTimeInSec: { type: Number, default: 0 },

	// LANGUAGE
	langue: { type: String, default: 'fr' },

	// AUTO MODÉRATION
	autoModActive: { type: Boolean, default: false },
	badWords: { type: Array, default: [] },

	// COOLDOWN
	cooldownTime: { type: Number, default: 0 },

	// TICKET
	ticketActivated: { type: Boolean, default: false },
	openMessage: { type: String, default: 'Ticket ouvert !' },
	ticketCategorie: { type: String, default: '' },
	ticketsCount: { type: Number, default: 1 },
	activeTicketMention: { type: Boolean, default: true },
	ticketHandlers: { type: Number, default: 0 },

	// MEMBERCOUNT
	memberCountChannelId: { type: String, default: '' }

})

module.exports = mongoose.model('Guild', guildSchema)

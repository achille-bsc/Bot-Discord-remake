const { Guild } = require('../models/index')

module.exports = async client => {
	client.createGuild = async guild => {
		const createGuild = new Guild({
			id: guild.id
		})

		createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`))
	}

	client.getGuild = async thisguild => {
		const guildData = await Guild.findOne({ id: thisguild.id })
		return guildData
	}

	client.updateGuild = async (guild) => {
		const guildData = await Guild.findOne({ id: guild.id })
		guildData.prefix = guildData.prefix || '!'
		guildData.welcomeMessageEnabled = guildData.welcomeMessageEnabled || true
		guildData.welcomeMessage = guildData.welcomeMessage || 'null'
		guildData.welcomeColor = guildData.welcomeColor || 'GREEN'
		guildData.welcomeChannel = guildData.welcomeChannel || '973164997511352320'
		guildData.goodByeMessageEnabled = guildData.goodByeMessageEnabled || true
		guildData.goodByeMessage = guildData.goodByeMessage || 'null'
		guildData.goodByeColor = guildData.goodByeColor || 'RED'
		guildData.goodByeChannel = guildData.goodByeChannel || '973164997511352320'
		guildData.save().then(g => console.log(`Serveur (${g.id}) mis à jour`))
	}
}

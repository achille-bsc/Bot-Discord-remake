const botPackage = require('../../package.json')
const statuses = [
	'ses engrenages...',
	'Un bon film.',
	'derrière toi',
	'/help',
	'la route',
	`la version V.${botPackage.version}`,
	'Achille'
]

function setActivity (client, i) {
	// Statut du Bot

	client.user.setActivity(statuses[i], {
		type: 'WATCHING',
		url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g'
	})
}

function verifGuildDb (client) {
	client.guilds.cache.forEach(async guild => {
		const guildDb = await client.getGuild(guild)
		if (guildDb.premium) {
			if (guildDb.endPremiumTimestamp <= Date.now()) {
				guildDb.premium = false
				guildDb.activated = false
				guildDb.endPremiumTimestamp = 0
				await guildDb.save()
				console.log('Le serveur '.red + guild.name.red + ' n\'est plus premium !'.red)
			}
		}
	})
}

module.exports = { setActivity, verifGuildDb }

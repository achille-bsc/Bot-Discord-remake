const { Guild } = require('../../models/index')
const Logger = require('../../utils/logger')

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(client, guild) {
		const createGuild = await new Guild({
			id: guild.id,
		})

		createGuild.save().then(g => Logger.client(`Nouveau serveur (${g.id})`));
	},
};
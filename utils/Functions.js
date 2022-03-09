const { client } = require('tmi.js');
const { Guild } = require('../models');
const guild = require('../models/guild');

module.exports = async client => {
	client.getGuild = async Guild => {
		const guildData = await Guild.findOne({ id: guild.id })
		return guildData;
	};

	client.createGuild = async guild => {
		const createGuild = new Guild({
			id: guild.id,
		})

		createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`));
	}

	client.updateGuild = async (guild, settings) => {
		let guildData = await client.getGuild(guild);
		if (typeof(guildData) != 'object') guildData = {};
		for (const key of settings) {
			if (guildData[key] != settings[key]) guildData[key] = settings[key]
		}
		return guildData.updateOne(settings)
	}
}
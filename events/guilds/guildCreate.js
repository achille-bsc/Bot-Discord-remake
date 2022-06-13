const Logger = require('../../utils/logger')

module.exports = {
<<<<<<< HEAD
	name: 'guildCreate',
	once: false,
	async execute (client, guild) {
		const haveGuild = client.getGuild(guild)
		if (!haveGuild) {
			try {
				const guildCreated = await client.createGuild(guild)
				guildCreated.save()
			} catch (err) {
				Logger.error(err)
			}
		}
	}
=======
  name: 'guildCreate',
  once: false,
  async execute (client, guild) {
    const haveGuild = client.getGuild(guild)
    if (!haveGuild) {
      try {
        const guildCreated = await client.createGuild(guild)
        guildCreated.save()
      } catch (err) {
        Logger.error(err)
      }
    }
  }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f
}

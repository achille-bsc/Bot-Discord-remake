const Logger = require('../../utils/logger')

module.exports = {
  name: 'guildCreate',
  once: false,
  async execute (client, guild) {
    const haveGuild = client.getGuild(guild)
    if (!haveGuild) {
      try {
        await client.createGuild(guild)
      } catch (err) {
        Logger.error(err)
      }
    }
  }
}

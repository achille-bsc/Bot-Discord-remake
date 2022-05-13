const Logger = require('../../utils/logger')

module.exports = {
  name: 'guildCreate',
  once: false,
  async execute (client, guild) {
    try {
      await client.createGuild(guild)
    } catch (err) {
      Logger.error(err)
    }
  }
}

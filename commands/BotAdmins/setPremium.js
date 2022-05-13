const config = require('../../config.json')

module.exports = {
  name: 'setpremium',
  description: 'Ajoute un serveur premium',
  permissions: ['setpremium'],
  ownerOnly: false,
  usage: 'setpremium <guildId>',
  examples: ['setpremium 123456789123456789'],
  category: 'botadmin',
  async run (client, message, args) {
    if (config.botadmins.includes(message.author.id)) {
      const guild = client.guilds.cache.get(args[0])
      const guildDb = await client.getGuild(guild)
      if (guildDb) {
        guildDb.premium = true
        guildDb.endPremiumTimestamp = Date.now() + (1000 * 60 * 60 * 24 * 30)
        guildDb.save().then(() => {
          message.channel.send(`Le serveur **${guild.name}** est maintenant premium !`)
        })
      }
    }
  }
}

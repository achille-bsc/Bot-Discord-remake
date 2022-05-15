/* eslint-disable no-tabs */
const botPackage = require('../../package.json')
require('colors')

module.exports = {
  name: 'ready',
  once: true,
  async execute (client) {
    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.green)
    console.log('┃                               ┃'.green)
    console.log('┃     '.green + 'Le bot est connecté !'.white + '     ┃'.green)
    console.log('┃                               ┃'.green)
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'.green)

    // Instantané
    const devGuild1 = await client.guilds.cache.get('848598227301040159')
    // const devGuild2 = await client.guilds.cache.get('848598227301040159')
    setTimeout(async () => {
      await devGuild1.commands.set(client.commands.map(cmd => cmd))
      console.log('COMMANDES MISES À JOURS !'.green)
    }, 1000)
    // devGuild2.commands.set(client.commands.map(cmd => cmd))

    // Global => 1H minimum
    // client.application.commands.set(client.commands.map(cmd => cmd))

    let i = 0
    const timeInSec = 10

    // Statut du Bot
    const statuses = [
      'ses engrenages...',
      'Un bon film.',
      '/help et !help',
      'derrière toi',
			`la version V.${botPackage.version}`,
			'Achille'
    ]
    setInterval(async () => {
      client.user.setActivity(statuses[i], {
        type: 'WATCHING',
        url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g'
      })

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

      i = ++i % statuses.length
    }, timeInSec * 10000)
  }
}

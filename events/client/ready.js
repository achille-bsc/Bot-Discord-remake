/* eslint-disable no-tabs */
require('colors')

module.exports = {
<<<<<<< HEAD
  name: 'ready',
  once: true,
  async execute (client) {
    // Instantané
    // const devGuild1 = await client.guilds.cache.get('848598227301040159')
    // const devGuild2 = await client.guilds.cache.get('848598227301040159')
    // await devGuild1.commands.set(client.commands.map(cmd => cmd))

    // devGuild1.commands.delete('974308129997197354') //
    // client.application.commands.delete('974308129997197354') //

    console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.green)
    console.log('┃                               ┃'.green)
    console.log('┃     '.green + 'Le bot est connecté !'.white + '     ┃'.green)
    console.log('┃                               ┃'.green)
    console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'.green)
    // devGuild2.commands.set(client.commands.map(cmd => cmd))

    // Global => 1H minimum

    let i = 0
    const timeInSec = 10

    // Statut du Bot
    const statuses = [
      'ses engrenages...',
      'Un bon film.',
      'derrière toi',
      '/help',
      'la route',
			`la version V.${botPackage.version}`,
			'Achille'
    ]
    setInterval(async () => {
      client.user.setActivity(statuses[i], {
        type: 'WATCHING',
        url: 'https://www.youtube.com/channel/UCoorq7xuhdcVe2hfRgu0_5g'
      })

      i = ++i % statuses.length
    }, timeInSec * 1000)
  }
=======
	name: 'ready',
	once: true,
	async execute (client) {
		// Instantané
		// const devGuild1 = await client.guilds.cache.get('848598227301040159')
		// const devGuild2 = await client.guilds.cache.get('848598227301040159')
		// await devGuild1.commands.set(client.commands.map(cmd => cmd))

		// devGuild1.commands.delete('974308129997197354') //
		// client.application.commands.delete('974308129997197354') //

		console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.green)
		console.log('┃                               ┃'.green)
		console.log('┃     '.green + 'Le bot est connecté !'.white + '     ┃'.green)
		console.log('┃                               ┃'.green)
		console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'.green)
		// devGuild2.commands.set(client.commands.map(cmd => cmd))

		// Global => 1H minimum

		let i = 0
		const timeInSec = 10

		setInterval(async () => {
			require('../../utils/Fonctions/events/ready').setActivity(client, i)
			require('../../utils/Fonctions/events/ready').verifGuildDb(client)

			i = ++i % 7
		}, timeInSec * 30000)
	}
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0
}

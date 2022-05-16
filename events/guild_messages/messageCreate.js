const prefix = '!'
const ownerid = '688098375697956905'
const langFr = require('../../languages/fr/events/messageCreate.json')
const langEn = require('../../languages/en/events/messageCreate.json')

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute (client, message) {
    const guild = await client.getGuild(message.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    if (message.author.bot) return
    let guildSettings = await client.getGuild(message.guild)

    if (!guildSettings) {
      await client.createGuild(message.guild)
      guildSettings = await client.getGuild(message.guild)
    }
    if (!message.content.startsWith(guildSettings.prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmdName = args.shift().toLowerCase()
    if (cmdName.length === 0) return

    const cmd = client.commands.get(cmdName)
    if (!cmd) return
    if (cmd.ownerOnly) {
      if (message.author.id !== ownerid) return message.reply(`${lang.adminsOnly}`)
    }

    if (!message.member.permissions.has([cmd.permissions])) return message.reply(`${lang.perms1} (\`${cmd.permissions.join(', ')}\`) ${lang.perms2}`)

    if (cmd) {
      cmd.run(client, message, args)
    }
  }
}

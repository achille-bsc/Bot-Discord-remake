const { MessageEmbed, Permissions } = require('discord.js')

const langFr = require('../../languages/fr/events/messageCreate.json')
const langEn = require('../../languages/en/events/messageCreate.json')

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute (client, message) {
    if (message.author.bot) return

    let guild = await client.getGuild(message.guild)
    if (!guild || guild === null) {
      try {
        guild = await client.createGuild(guild)
        client.updateGuild(guild)
      } catch (err) {}
      guild = await client.getGuild(message.guild)
    }
    // const lang = guild.langue === 'fr' ? langFr : langEn

    let guildSettings = await client.getGuild(message.guild)
    if (!guildSettings) {
      await client.createGuild(message.guild)
      guildSettings = await client.getGuild(message.guild)
    }

    // const guildBadWords = guild.badWords

    // if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
    //   if (guild.autoModActive) {
    //     for (const word of guildBadWords) {
    //       if (message.content.includes(word)) {
    //         message.channel.send(`<@${message.author.id}>\n${lang.autoModErreur1} \`${word}\` ${lang.autoModErreur2}`)
    //         setTimeout(() => {
    //           message.delete()
    //         }, 5000)
    //         return
    //       }
    //     }
    //   }
    // }

    if (message.author.id === message.guild.ownerId || message.author.id === '688098375697956905') {
      if (message.content === '!slash') {
        console.log('test')
        const guildObject = await client.guilds.cache.get(message.guild.id)
        await guildObject.commands.set(client.commands.map(cmd => cmd))
        await message.delete()
        const embed = new MessageEmbed()
          .setTitle('slash commands activé')
          .setColor('GREEN')
        await message.channel.send({ embeds: [embed] })
      }
    }
  }
}

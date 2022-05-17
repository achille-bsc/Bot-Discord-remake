const { MessageEmbed, Permissions } = require('discord.js')
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

    const guildBadWords = guild.badWords

    if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
      for (const word of guildBadWords) {
        if (message.content.includes(word)) {
          message.channel.send(`<@${message.author.id}>\n${lang.autoModErreur1} \`${word}\` ${lang.autoModErreur2}`)
          setTimeout(() => {
            message.delete()
          }, 5000)
          return
        }
      }
    }

    if (!guildSettings) {
      await client.createGuild(message.guild)
      guildSettings = await client.getGuild(message.guild)
    }

    if (message.author.id === message.guild.ownerId) {
      if (message.content === '!slash') {
        const guildObject = await client.guilds.cache.get(message.guild.id)
        await guildObject.commands.set(client.commands.map(cmd => cmd))
        guild.save().then(async () => {
          const embed = new MessageEmbed()
            .setTitle(lang.trueTitle)
            .setColor('GREEN')
            .setFooter({ text: `${lang.footer} ${message.author.tag}`, avatarURL: `${message.author.displayAvatarURL(true)}` })
          await message.delete()
          message.channel.send({ embeds: [embed] })
        })
      }
    }
  }
}

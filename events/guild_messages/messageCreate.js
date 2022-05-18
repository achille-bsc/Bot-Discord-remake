const { MessageEmbed, Permissions } = require('discord.js')

const langFr = require('../../languages/fr/events/messageCreate.json')
const langEn = require('../../languages/en/events/messageCreate.json')

const talkedRecently = new Set()
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute (client, message) {
    const guild = await client.getGuild(message.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    if (message.author.bot) return
    let guildSettings = await client.getGuild(message.guild)

    if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
      if (talkedRecently.has(message.author.id)) {
        message.delete()
        message.channel.send({ content: `<@${message.author.id}> - ${lang}` })
      } else {
        // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id)
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id)
        }, 60000)
      }
    }

    const guildBadWords = guild.badWords

    if (!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) {
      if (guild.autoModActive) {
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
    }

    if (!guildSettings) {
      await client.createGuild(message.guild)
      guildSettings = await client.getGuild(message.guild)
    }

    if (message.author.id === message.guild.ownerId) {
      if (message.content === '!slash on') {
        const guildObject = await client.guilds.cache.get(message.guild.id)
        await guildObject.commands.set(client.commands.map(cmd => cmd))
        guild.save().then(async () => {
          const embed = new MessageEmbed()
            .setTitle(lang.trueTitle)
            .setColor('GREEN')
            .setFooter({ text: `${lang.footer} ${message.author.tag}`, avatarURL: `${message.author.displayAvatarURL(true)}` })
          await message.delete()
          await message.channel.send({ embeds: [embed] })
        })
      } else if (message.content === '!slash off') {
        const reply = await message.reply('Veuillez patienter. L\'oppération peut prendre un certain temps')
        const token = process.env.YMULE
        const clientId = process.env.CLIENT_ID
        const guildId = message.guild.id

        const rest = new REST({ version: '9' }).setToken(token)
        rest.get(Routes.applicationGuildCommands(clientId, guildId))
          .then(data => {
            const promises = []
            for (const command of data) {
              const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`
              promises.push(rest.delete(deleteUrl))
            }
            return Promise.all(promises)
          }).then(() => {
            reply.delete()
            message.delete()
            message.channel.send('Les commandes ont correctement été désactivés !')
          })
      }
    }
  }
}

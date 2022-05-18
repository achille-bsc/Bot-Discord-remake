const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Admins/badWord.json')
const langEn = require('../../languages/en/Admins/badWord.json')

module.exports = {
  name: 'badword',
  description: 'Permet de créer un message de validation du règlement.',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'welcome',
  examples: ['welcome'],
  category: 'Auto-Modération',
  options: [
    {
      name: 'active',
      description: 'Activer l\'auto-modération',
      type: 'SUB_COMMAND'
    },
    {
      name: 'desactive',
      description: 'Désactiver l\'auto-modération',
      type: 'SUB_COMMAND'
    },
    {
      name: 'config',
      description: 'Activer la commande',
      type: 'SUB_COMMAND_GROUP',
      options: [
        {
          name: 'add',
          description: 'Ajoute un mot interdit sur le serveur',
          type: 'SUB_COMMAND',
          options: [
            {
              name: 'mots',
              description: 'Mot(s) à ajouter à l\'auto-modération (séparez les mots par ", "\'',
              type: 'STRING',
              required: true
            }
          ]
        },
        {
          name: 'remove',
          description: 'Retire un mot interdit sur le serveur',
          type: 'SUB_COMMAND',
          options: [
            {
              name: 'mots',
              description: 'Mot(s) à retirer de l\'auto-modération (séparez les mots par ", "',
              type: 'STRING',
              required: true
            }
          ]
        },
        {
          name: 'list',
          description: 'Liste les mots interdits sur le serveur',
          type: 'SUB_COMMAND'
        }
      ]
    }
  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    if (interaction.options.getSubcommand() === 'list') {
      const embed = new MessageEmbed()
        .setTitle(lang.listTitle)
        .setDescription(`\`${guild.badWords.join('`, `')}\``)
        .setColor('BLURPLE')
        .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

      interaction.reply({ embeds: [embed], ephemeral: true })
    }
    if (interaction.options.getSubcommand() === 'add') {
      let words = (interaction.options.getString('mots'))
      words = words.split(', ')
      const addedWords = []
      const notAddedWords = []
      for (const word of words) {
        if (guild.badWords.includes(word)) {
          notAddedWords.push(word)
          continue
        }
        addedWords.push(word)
        await guild.badWords.push(`${word}`)
      }
      guild.save().then(() => {
        const Addembed = new MessageEmbed()
          .setTitle(lang.addTitle)
          .setDescription(`${lang.addDescription1} \`${addedWords.join('`, `') || lang.noWords}\` ${lang.addDescription2}${notAddedWords.length > 0 ? `\n\n${lang.addDescription1} \`${notAddedWords.join('`, `') || `${lang.noWords}`}\` ${lang.notAdded}` : ''}`)
          .setColor('BLURPLE')
          .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

        interaction.reply({ embeds: [Addembed], ephemeral: false })
      })
    }
    if (interaction.options.getSubcommand() === 'remove') {
      let words = (interaction.options.getString('mots'))
      words = words.split(', ')
      const removedWords = []
      for (const word of words) {
        if (guild.badWords.indexOf(word) === -1) {
          continue
        }
        removedWords.push(word)
        const index = guild.badWords.indexOf(word)
        await guild.badWords.splice(index, 1)
        // await guild.badWords.splice(`${word}`)
      }
      guild.save().then(() => {
        const Addembed = new MessageEmbed()
          .setTitle(lang.addTitle)
          .setDescription(`${lang.removeDescription1} \`${removedWords.join('`, `')}\` ${lang.removeDescription2}`)
          .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })
          .setColor('BLURPLE')

        interaction.reply({ embeds: [Addembed], ephemeral: false })
      })
    }

    if (interaction.options.getSubcommand() === 'active') {
      guild.autoModActive = true
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(lang.activeTitle)
          .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })
          .setColor('GREEN')

        interaction.reply({ embeds: [embed], ephemeral: false })
      })
    }
    if (interaction.options.getSubcommand() === 'desactive') {
      guild.autoModActive = false
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(lang.activeTitle)
          .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })
          .setColor('GREEN')

        interaction.reply({ embeds: [embed], ephemeral: false })
      })
    }
  }
}

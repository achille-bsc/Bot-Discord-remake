const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Configs/privateroom.json')
const langEn = require('../../languages/en/Configs/privateroom.json')

module.exports = {
  name: 'privateroom',
  description: 'Permet de mettre en place un système de salon vocal à la demande',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'privateroom <channel Name>',
  examples: ['privateroom Salons Privés'],
  category: 'configuration',
  async run (client, message, args) {
  },
  options: [
    {
      name: 'salon',
      description: 'Nom du salon de privateroom',
      type: 'STRING',
      required: true
    },
    {
      name: 'temps',
      description: 'Temps que le salon mettra avant d\'êtree suprimé !',
      type: 'NUMBER',
      minValue: 0,
      maxValue: 900,
      required: true
    }
  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const langue = guild.langue

    if (guild.privateRooms.length === 0 || (guild.premium && guild.activated)) {
      const salon = interaction.options.getString('salon').replace('{default}', '➕ Créer votre salon')
      const time = (guild.premium && guild.activated) ? interaction.options.getNumber('temps') : (interaction.options.getNumber('temps') > 15 ? 15 : interaction.options.getNumber('temps')) || guild.roomsDeleteTimeInSec
      const channel = await interaction.guild.channels.create(salon, { type: 'GUILD_VOICE' })
      await guild.privateRooms.push(`${channel.id}`)
      guild.roomsDeleteTimeInSec = time

      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(langue === 'fr' ? langFr.embedTitle : langEn.embedTitle)
          .setDescription(`${langue === 'fr' ? langFr.embedDescrptionPart1 : langEn.embedDescrptionPart1} => <#${channel.id}> ✅\n${langue === 'fr' ? langFr.embedDescriptionPart2 : langEn.embedDescriptionPart2} \`${time}\` ${langue === 'fr' ? langFr.embedDescriptionPart3 : langEn.embedDescriptionPart3}. ${(guild.premium && guild.activated) ? '' : (interaction.options.getNumber('temps') > 15 ? 15 : `(${langue === 'fr' ? langFr.embedDescriptionPart4 : langEn.embedDescriptionPart4} => \`!getPremium\`)`)}`)
          .setColor('GREEN')
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle(langue === 'fr' ? langFr.erreurTitle : langEn.erreurTitle)
          .setColor('RED')
          .setDescription(`${langue === 'fr' ? langFr.erreurDescription : langEn.erreurDescription}\n\`\`\`${error}\`\`\``)

        interaction.reply({ embeds: [erreur], ephemeral: true })
      })
    } else {
      const embed = new MessageEmbed()
        .setTitle(langue === 'fr' ? langFr.erreurPremiumTitle : langEn.erreurPremiumTitle)
        .setColor('RED')
        .setDescription(`${langue === 'fr' ? langFr.erreurPremiumDescription : langEn.erreurPremiumDescription} (\`${guild.prefix}getpremium\`)`)
        .setTimestamp()
      interaction.reply({ embeds: [embed], ephemeral: true })
    }
  }
}

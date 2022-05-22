const { MessageEmbed, MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js')
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
  options: [
    {
      name: 'delete',
      description: 'permet de supprimer des salons de privaterooms',
      type: 'SUB_COMMAND'
    },
    {
      name: 'config',
      description: 'permet de configurer un nouveau salon de privaterooms',
      type: 'SUB_COMMAND',
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
      ]
    }
  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    if (interaction.options.getSubcommand() === 'delete') {
      const embed = new MessageEmbed()
        .setTitle('Privaterooms')
        .setDescription(`${lang.deleteEmbedDescription}`)
        .setColor('GREEN')

      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('privateroom')
            .setPlaceholder(`${lang.selectNoSelection}`)
        )
      guild.privateRooms.forEach((room) => {
        const gotRoom = interaction.guild.channels.cache.get(room)
        row.components[0].addOptions([
          {
            label: `${gotRoom.name}`,
            description: 'Privateroom',
            value: `${room}`
          }
        ])
      })
      if (guild.privateRooms < 1) {
        embed.setDescription('')
        embed.addField(`${lang.deleteEmbedNoChannelFiledName}`, `${lang.deleteEmbedNoChannelFiledValue}`)
        interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
      }
    } else {
      if (guild.privateRooms.length === 0 || (guild.premium && guild.activated)) {
        const salon = interaction.options.getString('salon').replace('{default}', `${guild.langue === 'fr' ? '➕ Créer votre salon' : '➕ Create your channel'}`)
        const time = (guild.premium && guild.activated) ? (interaction.options.getNumber('temps') > 3600 ? 3600 : interaction.options.getNumber('temps')) : ((interaction.options.getNumber('temps') > 15 ? 15 : interaction.options.getNumber('temps'))) || guild.roomsDeleteTimeInSec
        const channel = await interaction.guild.channels.create(salon, {
          type: 'GUILD_VOICE',
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              allow: [Permissions.FLAGS.CONNECT]
            }
          ]
        })
        await guild.privateRooms.push(`${channel.id}`)
        guild.roomsDeleteTimeInSec = time

        guild.save().then(() => {
          const embed = new MessageEmbed()
            .setTitle(`${lang.embedTitle}`)
            .setDescription(`${lang.embedDescrptionPart1} => <#${channel.id}> ✅\n${lang.embedDescriptionPart2} \`${time}\` ${lang.embedDescriptionPart3}.\n*(${(guild.premium && guild.activated) ? '' : lang.embedDescriptionPart4})* => \`!getPremium\`)`)
            .setColor('GREEN')
            .setTimestamp()
          interaction.reply({ embeds: [embed], ephemeral: true })
        }).catch((error) => {
          const erreur = new MessageEmbed()
            .setTitle(lang.erreurTitle)
            .setColor('RED')
            .setDescription(`${lang.erreurDescription}\n\`\`\`${error}\`\`\``)

          interaction.reply({ embeds: [erreur], ephemeral: true })
        })
      } else {
        const embed = new MessageEmbed()
          .setTitle(lang.erreurPremiumTitle)
          .setColor('RED')
          .setDescription(`${lang.erreurPremiumDescription} (\`/getpremium\`)`)
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }
    }
  }

}

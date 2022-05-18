const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
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
    const langue = guild.langue

    if (interaction.options.getSubcommand() === 'delete') {
      const embed = new MessageEmbed()
        .setTitle('Privaterooms')
        .setDescription('Veuillez séléctionner le salon de privateRoom que vous souhaitez supprimer')
        .setColor('GREEN')

      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('privateroom')
            .setPlaceholder('Aucune selection')
        )
      guild.privateRooms.forEach((room) => {
        const roomName = interaction.guild.channels.cache.get(room)
        row.components[0].addOptions([
          {
            label: `${roomName}`,
            description: 'Privateroom',
            value: `${room}`
          }
        ])
      })
      if (guild.privateRooms < 1) {
        embed.addField('Aucun salon', 'Vous n\'avez aucun salon privateRooms sur le serveur actuellement')
        interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
      }

      /* reply.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', time: 60000 })
        .then(async interaction => {
          const confirmEmbed = new MessageEmbed()
            .setTitl('Confirmation')
            .setDescription(`Confirmez -vous la suppression du salon <#${interaction.value}> ?`)
            .setColor('GREEN')
          const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('yes')
                .setLabel('Oui')
                .setStyle('SUCCESS'),
              new MessageButton()
                .setCustomId('no')
                .setLabel('Non')
                .setStyle('DANGER')
            )
          const confirmReply = await interaction.reply({ embeds: [confirmEmbed], components: [row], ephemeral: true })
          confirmReply.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
            .then(async interaction2 => {
              if (interaction2.customId === 'yes') {
                const channel = interaction2.guild.channels.cache.get(interaction.value)
                await channel.delete()

                const endEmbed = new MessageEmbed()
                  .setTitle('Salon supprimé')
                  .setDescription('Le salon <#interaction.value> à correctement été supprimé !')
                  .setColor('GREEN')

                interaction2.reply({ embeds: [endEmbed], ephemeral: true })
              }
            })
            .catch(() => console.log('No interactions were collected.'))
        })
        .catch(() => reply.reply('temps écoulé !')) */
    } else {
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

}

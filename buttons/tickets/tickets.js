const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js')
const langFr = require('../../languages/fr/events/interactionCreate.json')
const langEn = require('../../languages/en/events/interactionCreate.json')

module.exports = {
  name: 'ticket',
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn
    const categoryId = guild.ticketCategorie
    const category = interaction.guild.channels.cache.get(categoryId)
    const openMessage = guild.openMessage
    const ticketCount = guild.ticketsCount

    const channel = await interaction.guild.channels.create(`ticket-${ticketCount}`, {
      type: 'GUILD_TEXT',
      permissionOverwrites: [
        {
          id: interaction.member.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MENTION_EVERYONE, Permissions.FLAGS.USE_APPLICATION_COMMANDS]
        },
        {
          id: interaction.guild.roles.everyone.id,
          disallow: [Permissions.FLAGS.VIEW_CHANNEL]
        }
      ],
      parent: category
    })
    const ticketOpenedMessageEmbed = new MessageEmbed()
      .setTitle(`${lang.buttonTicketEmbedTitle}`)
      .setDescription(`${openMessage}`)
      .setColor('GREEN')
      .setFooter({ text: `${interaction.member.user.tag}`, iconURL: `${interaction.member.user.displayAvatarURL({ dynamic: true })}` })

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('closeTicket')
          .setLabel(`${lang.buttonCloseTicket}`)
          .setStyle('DANGER')
      )

    await channel.send({ embeds: [ticketOpenedMessageEmbed], components: [row] })

    interaction.reply({ content: `Votre ticket <#${channel.id}> à correctement été créé !`, ephemeral: true })

    guild.ticketsCount = ticketCount + 1
    guild.save()
  }
}

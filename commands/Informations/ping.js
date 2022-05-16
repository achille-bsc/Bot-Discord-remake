const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Informations/ping.json')
const langEn = require('../../languages/en/Informations/ping.json')

module.exports = {
  name: 'ping',
  description: 'Donne la lantence du bot ainsi que quelques informations détaillés part rapport à son hébergement',
  permissions: ['VIEW_CHANNEL'],
  ownerOnly: false,
  usage: 'ping',
  examples: ['ping'],
  category: 'informations',
  options: [],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    const pingEmbed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle(lang.title)
      .setDescription(lang.description)
      .addFields(
        { name: `${lang.latence} > BOT`, value: `\`${lang.calcul}\``, inline: true },
        { name: `${lang.latence} > API`, value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
        { name: 'Total', value: '`Calcul en cours...`', inline: true },
        { name: `${lang.ram}`, value: '`512`MG', inline: true },
        { name: `${lang.disk}`, value: '`1`GB', inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `${lang.footer} ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL()}` })

    const messagePing = await interaction.reply({ embeds: [pingEmbed], ephemeral: false, fetchReply: true })

    await wait(1)

    const botPing = messagePing.createdTimestamp - interaction.createdTimestamp
    const pingEmbedEdited = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle(lang.title)
      .setDescription(lang.description)
      .addFields(
        { name: `${lang.latence} > BOT`, value: `\`${botPing}\`ms`, inline: true },
        { name: `${lang.latence} > API`, value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
        { name: 'Total', value: `\`${botPing + Math.round(client.ws.ping)}\`ms`, inline: true },
        { name: `${lang.ram}`, value: '`512`MG', inline: true },
        { name: `${lang.disk}`, value: '`1`GB', inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `${lang.footer} ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL()}` })

    interaction.editReply({ embeds: [pingEmbedEdited], ephemeral: false })
  }
}

function wait (waitsecs = 5) {
  return new Promise(resolve => setTimeout(resolve, waitsecs))
}

const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Informations/configInfos.json')
const langEn = require('../../languages/en/Informations/configInfos.json')

module.exports = {
  name: 'configinfos',
  description: 'Donne des infos sur la configuration du bot',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'infos',
  examples: ['infos'],
  category: 'informations',
  options: [],

  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    const pingEmbed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle(lang.title)
      .setDescription(lang.description)
      .addField(lang.welcome, `\`${guild.welcomeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
      .addField(lang.goodbye, `\`${guild.goodByeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
      .addField(lang.premium, `**\`${guild.premium ? lang.yes : lang.no}\`**`, true)
      .addField(lang.premiumActive, `**\`${(guild.premium && guild.activated) ? lang.yes : lang.no}\`**`, true)
      .setTimestamp()
      .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

    await interaction.reply({ embeds: [pingEmbed], ephemeral: true })
  }
}

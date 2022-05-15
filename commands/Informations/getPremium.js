const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
const langFr = require('../../languages/fr/Informations/getPremium.json')
const langEn = require('../../languages/en/Informations/getPremium.json')

module.exports = {
  name: 'getpremium',
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
      .addField(`${lang.sevenDays}`, `\`${config.weekPrice}€\``, true)
      .addField(`${lang.aMonth}`, `\`${config.monthPrice}€\``, true)
      .addField(`${lang.sixMonths}`, `\`${config.monthPrice}€\``, true)
      .addField(`${lang.aYear}`, `\`${config.yearPrice}€\``, true)
      .setTimestamp()

    await interaction.reply({ embeds: [pingEmbed] })
  }
}

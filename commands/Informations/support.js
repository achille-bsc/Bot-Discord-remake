const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'configinfos',
  description: 'Donne des infos sur la configuration du bot',
  permissions: ['VIEW_CHANNEL'],
  ownerOnly: false,
  usage: 'infos',
  examples: ['infos'],
  category: 'informations',
  options: [],

  async runInteraction (client, interaction) {
    const supportEmbed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('Support')
      .setURL('https://discord.gg/M23bbRgxQH')

    await interaction.reply({ embeds: [supportEmbed], ephemeral: true })
  }
}

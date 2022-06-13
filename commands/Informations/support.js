const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'support',
  description: 'Envoit  un lien vers  le serveur support',
  permissions: ['VIEW_CHANNEL'],
  ownerOnly: false,
  usage: 'support',
  examples: ['support'],
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

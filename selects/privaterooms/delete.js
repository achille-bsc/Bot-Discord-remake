const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'privateroom',
  async runInteraction (client, interaction) {
    const channel = interaction.guild.channels.cache.get(interaction.values[0])
    await interaction.guild.channels.cache.get(interaction.values[0]).delete()
    const endEmbed = new MessageEmbed()
      .setTitle('Salon supprimé')
      .setDescription(`Le salon \`${channel.name}>\` à correctement été supprimé !`)
      .setColor('GREEN')
    interaction.reply({ embeds: [endEmbed], ephemeral: true })
  }
}

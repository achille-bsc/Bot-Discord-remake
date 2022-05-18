const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'privateroom',
  async runInteraction (client, interaction) {
    console.log(interaction.values[0])
    await interaction.guild.channels.cache.get(interaction.values[0]).delete()
    const endEmbed = new MessageEmbed()
      .setTitle('Salon supprimé')
      .setDescription(`Le salon <#${interaction.value}> à correctement été supprimé !`)
      .setColor('GREEN')
    interaction.reply({ embeds: [endEmbed], ephemeral: true })
  }
}

const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'langue',
  description: 'Permet de définir la langue du bot sur le serveur.',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'langue <langue>',
  examples: ['langue fr'],
  category: 'configuration',
  options: [
    {
      name: 'langue',
      description: 'Langue',
      type: 'STRING',
      required: true,
      choices: [
        { name: 'Français', value: 'fr' },
        { name: 'English', value: 'en' }
      ]
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const langue = interaction.options.getString('langue')

    guild.langue = langue
    await guild.save()

    if (langue === 'fr') {
      const embed = new MessageEmbed()
        .setTitle('La langue à correctement été définit sur `Français`')
        .setColor('GREEN')

      interaction.reply({ embeds: [embed], ephemeral: true })
    } else if (langue === 'en') {
      const embed = new MessageEmbed()
        .setTitle('The language has been correctly set to `English`')
        .setColor('GREEN')

      interaction.reply({ embeds: [embed], ephemeral: true })
    }
  }
}

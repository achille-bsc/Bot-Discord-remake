const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')
module.exports = {
  name: 'getpremium',
  description: 'Donne des infos sur la configuration du bot',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'infos',
  examples: ['infos'],
  category: 'informations',
  async run (client, message, args) {
    const pingEmbed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle('Informations Premium')
      .setDescription('Vous pouvez aquerir le premium du bot en rejoignant le [serveur support](https://discord.gg/M23bbRgxQH)')
      .addField('Prix 7 jours', `\`${config.weekPrice}€\``, true)
      .addField('Prix 28 jours', `\`${config.monthPrice}€\``, true)
      .addField('Prix 6 x 30 jours', `\`${config.monthPrice}€\``, true)
      .addField('Prix 12 x 30 jours an', `\`${config.yearPrice}€\``, true)
      .setTimestamp()

    await message.channel.send({ embeds: [pingEmbed] })
    await message.delete()
  },
  options: [],

  async runInteraction (client, interaction) {
    const pingEmbed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle('Informations Premium')
      .setDescription('Vous pouvez aquerir le premium du bot en rejoignant le [serveur support](https://discord.gg/M23bbRgxQH)')
      .addField('Prix 7 jours', `\`${config.weekPrice}€\``, true)
      .addField('Prix 28 jours', `\`${config.monthPrice}€\``, true)
      .addField('Prix 6 x 30 jours', `\`${config.monthPrice}€\``, true)
      .addField('Prix 12 x 30 jours an', `\`${config.yearPrice}€\``, true)
      .setTimestamp()

    await interaction.reply({ embeds: [pingEmbed] })
  }
}

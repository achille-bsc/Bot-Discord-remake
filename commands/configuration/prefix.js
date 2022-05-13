const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'prefix',
  description: 'Permet de définir le préfix du bot sur le serveur.',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'prefix <prefix>',
  examples: ['prefix !'],
  category: 'configuration',
  async run (client, message, args) {
  },
  options: [
    {
      name: 'prefixe',
      description: 'Nouveau préfixe.',
      type: 'STRING',
      required: true
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    const prefix = interaction.options.getString('prefixe')
    if (prefix !== null) {
      guild.prefix = prefix
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(`Le préfix à correctement été défini sur \`${guild.prefix}\``)
          .setColor('GREEN')
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle('Erreur')
          .setColor('RED')
          .setDescription(`Une erreur est survenue lors de la sauvegarde de la configuration. Veuillez réessayer ultérieurement.\nSi le problème persiste, contactez un administrateur.\n\`\`\`${error}\`\`\``)

        interaction.reply({ embeds: [erreur], ephemeral: true })
      })
    }
  }
}

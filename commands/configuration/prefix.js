const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Configs/prefix.json')
const langEn = require('../../languages/en/Configs/prefix.json')

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
      description: 'Nouveau préfixe ("{default}" pour remettre la valeur par défaut)',
      type: 'STRING',
      required: true
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const langue = guild.langue

    const prefix = interaction.options.getString('prefixe')
    if (prefix !== null) {
      guild.prefix = prefix
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(`${langue === 'fr' ? langFr.embedTitle : langEn.embedTitle} \`${guild.prefix}\``)
          .setColor('GREEN')
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle(langue === 'fr' ? langFr.erreurTitle : langEn.erreurTitle)
          .setColor('RED')
          .setDescription(`${langue === 'fr' ? langFr.erreurDescription : langEn.erreurDescription}\n\`\`\`${error}\`\`\``)

        interaction.reply({ embeds: [erreur], ephemeral: true })
      })
    }
  }
}

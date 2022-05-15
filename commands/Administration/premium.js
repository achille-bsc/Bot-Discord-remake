const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Admins/premium.json')
const langEn = require('../../languages/en/Admins/premium.json')

module.exports = {
  name: 'premium',
  description: 'Permet d\'activer ou de désactiver le mode premium',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'premium <on/off>',
  examples: ['premium on', 'premium off'],
  category: 'Administration',
  options: [
    {
      name: 'option',
      description: 'Que voullez-vous faire ?',
      type: 'STRING',
      choices: [
        { name: 'Activer', value: 'true' },
        { name: 'Désactiver', value: 'false' }
      ],
      required: true
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    const toggled = interaction.options.getString('option')
    const reToggled = toggled === 'true'

    guild.activated = reToggled
    guild.save().then(() => {
      const embed = new MessageEmbed()
        .setTitle(`${guild.langue === 'fr' ? langFr.embedTitleCorp : langEn.embedTitleCorp} ${reToggled ? (guild.langue === 'fr' ? langFr.embedTitleActiv : langEn.embedTitleActiv) : (guild.langue === 'fr' ? langFr.embedTitleDesactiv : langEn.embedTitleDesactiv)}`)
        .setColor(reToggled ? 'GREEN' : 'RED')
        .setTimestamp()
      interaction.reply({ embeds: [embed], ephemeral: true })
    }).catch((error) => {
      const erreur = new MessageEmbed()
        .setTitle(`${guild.langue === 'fr' ? langFr.errorTitle : langEn.erreurTitle}`)
        .setColor('RED')
        .setDescription(`${guild.langue === 'fr' ? langFr.errorMsg : langEn.erreurMsg}\`\`\`${error}\`\`\``)

      interaction.reply({ embeds: [erreur], ephemeral: true })
    })
  }
}

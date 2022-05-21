const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
  name: 'premium',
  description: 'Commandes',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'premium <on/off>',
  examples: ['premium on', 'premium off'],
  category: 'Premium',
  options: [
    {
      name: 'infos',
      description: 'informations',
      type: 'SUB_COMMAND'
    },
    {
      name: 'activation',
      description: 'activation / desactivation',
      type: 'SUB_COMMAND',
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
      ]
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    if (interaction.options.getSubcommand('infos')) {
      console.log('infos')
      const langFr = require('../../languages/fr/Informations/getPremium.json')
      const langEn = require('../../languages/en/Informations/getPremium.json')
      const lang = guild.langue === 'fr' ? langFr : langEn

      const pingEmbed = new MessageEmbed()
        .setColor('BLURPLE')
        .setTitle(`${lang.title}`)
        .setDescription(`${lang.description}`)
        .addField(`${lang.sevenDays}`, `\`${config.weekPrice}€\``, true)
        .addField(`${lang.aMonth}`, `\`${config.monthPrice}€\``, true)
        .addField(`${lang.sixMonths}`, `\`${config.monthPrice}€\``, true)
        .addField(`${lang.aYear}`, `\`${config.yearPrice}€\``, true)
        .setTimestamp()

      await interaction.reply({ embeds: [pingEmbed] })
    } else if (interaction.options.getSubcommand('activation')) {
      console.log('activation')
      const langFr = require('../../languages/fr/Admins/premium.json')
      const langEn = require('../../languages/en/Admins/premium.json')
      const lang = guild.langue === 'fr' ? langFr : langEn

      const toggled = interaction.options.getString('option')
      const reToggled = toggled === 'true'

      guild.activated = reToggled
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle(`${lang.embedTitleCorp} ${reToggled ? (lang.embedTitleActiv) : (lang.embedTitleDesactiv)}`)
          .setColor(reToggled ? 'GREEN' : 'RED')
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle(`${lang.errorTitle}`)
          .setColor('RED')
          .setDescription(`${lang.errorMsg}\`\`\`${error}\`\`\``)

        interaction.reply({ embeds: [erreur], ephemeral: true })
      })
    }
  }
}

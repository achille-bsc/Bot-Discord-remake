const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Admins/cooldown.json')
const langEn = require('../../languages/en/Admins/cooldown.json')

module.exports = {
  name: 'cooldown',
  description: 'Permet de définir un cooldown sur le serveur',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'cooldown',
  examples: ['cooldown'],
  category: 'Auto-Modération',

  options: [
    {
      name: 'time',
      description: 'Intervalle de temps en secondes',
      type: 'NUMBER',
      required: true
    }
  ],

  async runInteraction (client, interaction) {
    const guild = client.getGUILD(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn
    const time = interaction.options.getNumber('time')

    guild.cooldownTime = time

    const embed = new MessageEmbed()
      .setTitle(lang.title)
      .setDescription(`${lang.description1} \`${time}\` ${lang.description2}`)
      .setColor('BLURPLE')
      .setFooter(lang)

    interaction.reply({ emebds: [embed], ephemeral: true })
  }

}

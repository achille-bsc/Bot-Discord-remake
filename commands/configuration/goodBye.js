const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Configs/goodBye.json')
const langEn = require('../../languages/en/Configs/goodBye.json')

module.exports = {
  name: 'goodbye',
  description: 'Permet de configurer le message de bienvenue',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: false,
  usage: 'goodbye',
  examples: ['goodbye'],
  category: 'configuration',
  async run (client, message, args) {
  },
  options: [
    {
      name: 'activer',
      description: 'Activer la commande',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'salon',
          description: 'Salon dans le quel vous souhaitez que les message de au revoir soit envoyés',
          type: 'CHANNEL',
          channelTypes: ['GUILD_TEXT'],
          required: true
        },

        {
          name: 'message',
          description: 'Message à afficher lors du départ d\'un membre du serveur',
          type: 'STRING',
          required: false
        }
      ]
    },
    {
      name: 'desactiver',
      description: 'Désactiver la commande',
      type: 'SUB_COMMAND'
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    const channel = interaction.options.getChannel('salon')
    const message = interaction.options.getString('message')
    const langue = guild.langue

    if (interaction.options.getSubcommand() === 'activer') {
      guild.goodByeMessageEnabled = true
      guild.goodByeChannel = channel.id
      guild.goodByeMessage = message || guild.goodByeMessage
    }

    guild.save().then(() => {
      const embedDesactive = new MessageEmbed()
        .setTitle(`${langue === 'fr' ? langFr.embedTitleCorp : langEn.embedTitleCorp} ${interaction.options.getSubcommand() === 'activer' ? (langue === 'fr' ? langFr.embedTitleActive : langEn.embedTitleActive) + '🔓' : (langue === 'fr' ? langFr.embedTitleDesactive : langEn.embedTitleDesactive) + '🔒'}`)
        .setDescription(`${interaction.options.getSubcommand() === 'activer' ? (langue === 'fr' ? langFr.embedDescriptionActivated : langEn.embedDescriptionActivated) + ' ✅' : (langue === 'fr' ? langFr.embedDescriptionDesactivated : langEn.embedDescriptionDesactivated) + ' ✅'}`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter({ text: `${interaction.options.getSubcommand() === 'activer' ? (langue === 'fr' ? langFr.embedFooterActivated : langEn.embedFooterActivated) : (langue === 'fr' ? langFr.embedFooterDesactived : langEn.embedFooterDesactived)}` })
      interaction.reply({ embeds: [embedDesactive], ephemeral: true })
    }).catch((error) => {
      const erreurDesactive = new MessageEmbed()
        .setColor('RED')
        .setTitle(langue === 'fr' ? langFr.erreurTitle : langEn.erreurTitle)
        .setDescription(`${langue === 'fr' ? langFr.erreurDescription : langEn.erreurDescription}\n\`\`\`${error}\`\`\``)

      interaction.reply({ embeds: [erreurDesactive], ephemeral: true })
    })
  }
}

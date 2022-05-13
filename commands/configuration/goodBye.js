const { MessageEmbed } = require('discord.js')

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
      description: 'Voulez-vous activer ou désactiver le message de au revoir ?',
      type: 'BOOLEAN',
      // choices: [
      //   { name: 'activer', value: 'true' },
      //   { name: 'désactiver', value: 'false' }
      // ],
      required: true
    },

    {
      name: 'message',
      description: 'Message à afficher lors du départ d\'un membre du serveur',
      type: 'STRING',
      required: false
    },
    {
      name: 'salon',
      description: 'Salon dans le quel vous souhaitez que les message de au revoir soit envoyés',
      type: 'CHANNEL',
      // choices: [
      //   { name: 'activer', value: 'true' },
      //   { name: 'désactiver', value: 'false' }
      // ],
      required: false
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    const activated = interaction.options.getBoolean('activer')
    const message = interaction.options.getString('message')
    const channel = interaction.options.getChannel('salon')

    if (activated === false) {
      guild.goodByeMessageEnabled = false
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle('Commande désactivée 🔒')
          .setDescription('Le système à correctement été désactivé ✅')
          .setColor('GREEN')
          .setTimestamp()
          .setFooter({ text: 'Message de au revoir Désactivé' })
        interaction.reply({ embeds: [embed], ephemeral: true })
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle('Erreur')
          .setColor('RED')
          .setDescription(`Une erreur est survenue lors de la sauvegarde de la configuration. Veuillez réessayer ultérieurement.\nSi le problème persiste, contactez un administrateur.\n\`\`\`${error}\`\`\``)

        interaction.reply({ embeds: [erreur], ephemeral: true })
      })
    } else if (activated === true && message !== null && channel !== null) {
      guild.goodByeMessageEnabled = true
      guild.goodByeMessage = message
      guild.goodByeChannel = channel.id
      guild.save().then(() => {
        const embed = new MessageEmbed()
          .setTitle('Commande activée 🔓')
          .setColor('GREEN')
          .setDescription('Le système à correctement été activée ! ✅')
          .setTimestamp()
          .setFooter({ text: 'Message de au revoir Activé' })

        try {
          interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (error) {}
      }).catch((error) => {
        const erreur = new MessageEmbed()
          .setTitle('Erreur')
          .setDescription(`Une erreur est survenue lors de la sauvegarde de la configuration. Veuillez réessayer ultérieurement.\nSi le problème persiste, contactez un administrateur.\n\`\`\`${error}\`\`\``)

        try {
          interaction.reply({ embeds: [erreur], ephemeral: true })
        } catch (error) {}
      })
    } else {
      const embed = new MessageEmbed()
        .setTitle('Erreur')
        .setColor('RED')
        .setDescription('Vous devez spécifier un message de bienvenue et un salon dans lequel il sera envoyé.')
        .setTimestamp()
        .setFooter({ text: 'Message de au revoir' })

      try {
        interaction.reply({ embeds: [embed], ephemeral: true })
      } catch (error) {}
    }
  }
}

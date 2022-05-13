const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'infos',
  description: 'Donne des infos sur la configuration du bot',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'infos',
  examples: ['infos'],
  category: 'informations',
  async run (client, message, args) {
  },
  options: [],

  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)

    const pingEmbed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle('Latence du bot')
      .setDescription('Informations sur les configurations du serveur')
      .addField('Message de bienvenue', `\`${guild.welcomeMessageEnabled ? 'Activé' : 'Désactivé'}\``, true)
      .addField('Message de Au Revoir', `\`${guild.goodByeMessageEnabled ? 'Activé' : 'Désactivé'}\``, true)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

    await interaction.reply({ embeds: [pingEmbed] })
  }
}

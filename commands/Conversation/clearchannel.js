const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/conversation/clearchannel.json')
const langEn = require('../../languages/en/conversation/clearchannel.json')

module.exports = {
  name: 'clearchannel',
  description: 'Permet de réinitialiser un salon à son état d\'origine.',
  permissions: ['MANAGE_CHANNELS'],
  ownerOnly: false,
  usage: 'clearchannel',
  examples: ['clearchannel'],
  category: 'conversation',
  options: [],
  async runInteraction (client, interaction) {
    const guild = client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    const embed = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle(`${lang.embedTitle}`)
      .setDescription(`${lang.embedDescription}`)
      .setTimestamp()
      .setFooter({ text: `${lang.embedFooter} ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })

    interaction.reply({ embeds: [embed] })
    const channel = await interaction.channel.clone()
    await interaction.channel.delete()
    const success = new MessageEmbed()
      .setColor('#4ED5F8')
      .setTitle(`${lang.embedTitle}`)
      .setDescription(`${lang.succesDescription}`)
      .setTimestamp()
      .setFooter({ text: `${lang.embedFooter} ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })

    channel.send({ embeds: [success] })
  }
}

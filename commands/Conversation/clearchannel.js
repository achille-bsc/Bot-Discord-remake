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
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    if (interaction.channel.id === interaction.guild.rulesChannelId) {
      const embed = new MessageEmbed()
        .setTitle(`${lang.erreurTitle}`)
        .setDescription(`${lang.guildStoreErrorDescription}`)
        .setColor('RED')
      interaction.reply({ embeds: [embed], ephemeral: true })
      return
    }
    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(`${lang.embedTitle}`)
      .setDescription(`${lang.embedDescription}`)
      .setTimestamp()
      .setFooter({ text: `${lang.embedFooter} ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })

    interaction.reply({ embeds: [embed] })
    const channel = await interaction.channel.clone()
    if (channel.type === 'GUILD_STORE') return console.log('salon de règlement')
    await interaction.channel.delete()
    const success = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(`${lang.embedTitle}`)
      .setDescription(`${lang.succesDescription}`)
      .setTimestamp()
      .setFooter({ text: `${lang.embedFooter} ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })

    channel.send({ embeds: [success] })
  }
}

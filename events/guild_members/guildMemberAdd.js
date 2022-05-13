const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute (client, member) {
    const guild = client.getGuild(member.guild)

    if (guild.welcomeMessageEnabled) {
      if (guild.welcomeMessageEnabled) {
        const embed = new MessageEmbed()
          .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
          .setColor(guild.welcomeColor)
          .setDescription(guild.welcomeMessage)
          .setTimestamp()
          .setFooter({ text: 'L\'utilisateur à rejoint !' })

        const logChannel = client.channels.cache.get(guild.welcomeChannel)

        logChannel.send({ embeds: [embed] })
      }
    }
  }
}

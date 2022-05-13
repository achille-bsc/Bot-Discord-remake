const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildMemberRemove',
  once: false,
  async execute (client, member) {
    const guild = client.getGuild(member.guild)

    if (guild.goodByeEnabled) {
      if (guild.goodByeMessageEnabled) {
        const embed = new MessageEmbed()
          .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
          .setColor(guild.goodByeColor)
          .setDescription(guild.goodByeMessage)
          .setTimestamp()
          .setFooter({ text: 'L\'utilisateur à rejoint !' })

        const logChannel = client.channels.cache.get(guild.goodByeChannel)

        logChannel.send({ embeds: [embed] })
      }
    }
  }
}

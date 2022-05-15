const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildMemberRemove',
  once: false,
  async execute (client, member) {
    const guild = await client.getGuild(member.guild)

    if (guild.goodByeMessageEnabled) {
      let description = guild.goodByeMessage.replace('{member}'.toLowerCase(), member.user.username)
      description = description.replace('{membercount}'.toLowerCase(), member.guild.memberCount)
      const embed = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
        .setColor(guild.goodByeColor)
        .setDescription(description)
        .setTimestamp()
        .setFooter({ text: 'L\'utilisateur à rejoint !' })

      const logChannel = client.channels.cache.get(guild.goodByeChannel)

      logChannel.send({ embeds: [embed] })
    }
  }
}

const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute (client, member) {
    const guild = await client.getGuild(member.guild)

    if (guild.welcomeMessageEnabled) {
      let description = guild.welcomeMessage.replace('{member}'.toLowerCase(), member.user.username)
      description = description.replace('{membercount}'.toLowerCase(), member.guild.memberCount)
      const embed = new MessageEmbed()
        .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
        .setColor(guild.welcomeColor)
        .setDescription(description)
        .setTimestamp()
        .setFooter({ text: 'L\'utilisateur à rejoint !' })

      const welcomeChannel = client.channels.cache.get(guild.welcomeChannel)

      welcomeChannel.send({ embeds: [embed] })
    }
  }
}

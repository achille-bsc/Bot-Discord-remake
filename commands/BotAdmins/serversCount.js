const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
  name: 'serverscount',
  description: 'Nombre  de serveurs sur le quel est le bot',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: true,
  usage: 'serverscount',
  examples: ['serverscount'],
  category: 'botadmin',

  options: [],

  async runInteraction (client, interaction) {
    if (!config.botadmins.includes(interaction.member.id)) return interaction.reply({ content: 'Cette commande n\'est disponnible que aux administrateurs du bot', ephemeral: true })

    const servs = client.guilds.cache.size
    let members = 0
    client.guilds.cache.map(async (serv) => {
      members = members + serv.memberCount
    })

    const embed = new MessageEmbed()
      .setTitle('📊 - MemberCount')
      .setDescription(`*Je suis actuellement sur ___**\`${servs}\`**___ serveurs*`)
      .addField('un total de ', `${members} membres`)
      .addField('Un total de ', servs + ' serveurs')
      .setColor('BLURPLE')
    interaction.reply({ embeds: [embed], ephemeral: true })
  }

}

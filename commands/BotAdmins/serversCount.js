const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

<<<<<<< HEAD
module.exports = {
  name: 'serverscount',
  description: 'Nombre  de serveurs sur le quel est le bot',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: true,
  usage: 'serverscount',
  examples: ['serverscount'],
  category: 'botadmin',
=======
<<<<<<< HEAD
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
=======
// module.exports = {
//   name: 'serverscount',
//   description: 'Nombre  de serveurs sur le quel est le bot',
//   permissions: ['ADMINISTRATOR'],
//   ownerOnly: true,
//   usage: 'serverscount',
//   examples: ['serverscount'],
//   category: 'botadmin',
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

  options: [],

  async runInteraction (client, interaction) {
    if (!config.botadmins.includes(interaction.member.id)) return interaction.reply({ content: 'Cette commande n\'est disponnible que aux administrateurs du bot', ephemeral: true })

    const servs = client.guilds.cache.size
    let members = 0
    client.guilds.cache.map(async (serv) => {
      members = members + serv.memberCount
    })

<<<<<<< HEAD
    const embed = new MessageEmbed()
      .setTitle('📊 - MemberCount')
      .setDescription(`*Je suis actuellement sur ___**\`${servs}\`**___ serveurs*`)
      .addField('un total de ', `${members} membres`)
      .addField('Un total de ', servs + ' serveurs')
      .setColor('BLURPLE')
    interaction.reply({ embeds: [embed], ephemeral: true })
  }
=======
//     const embed = new MessageEmbed()
//       .setTitle('📊 - MemberCount')
//       .setDescription(`*Je suis actuellement sur ___**\`${servs}\`**___ serveurs*`)
//       .addField('un total de ', `${members} membres`)
//       .addField('Un total de ', servs + ' serveurs')
//       .setColor('BLURPLE')
//     interaction.reply({ embeds: [embed], ephemeral: true })
//   }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

}

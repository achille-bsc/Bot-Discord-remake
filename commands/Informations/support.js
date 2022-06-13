const { MessageEmbed } = require('discord.js')

<<<<<<< HEAD
module.exports = {
  name: 'support',
  description: 'Envoit  un lien vers  le serveur support',
  permissions: ['VIEW_CHANNEL'],
  ownerOnly: false,
  usage: 'support',
  examples: ['support'],
  category: 'informations',
  options: [],
=======
<<<<<<< HEAD
module.exports = {
	name: 'support',
	description: 'Envoit  un lien vers  le serveur support',
	permissions: ['VIEW_CHANNEL'],
	ownerOnly: false,
	usage: 'support',
	examples: ['support'],
	category: 'informations',
	options: [],

	async runInteraction (client, interaction) {
		const supportEmbed = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('Support')
			.setURL('https://discord.gg/M23bbRgxQH')

		await interaction.reply({ embeds: [supportEmbed], ephemeral: true })
	}
}
=======
// module.exports = {
//   name: 'support',
//   description: 'Envoit  un lien vers  le serveur support',
//   permissions: ['VIEW_CHANNEL'],
//   ownerOnly: false,
//   usage: 'support',
//   examples: ['support'],
//   category: 'informations',
//   options: [],
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

  async runInteraction (client, interaction) {
    const supportEmbed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle('Support')
      .setURL('https://discord.gg/M23bbRgxQH')

<<<<<<< HEAD
    await interaction.reply({ embeds: [supportEmbed], ephemeral: true })
  }
}
=======
//     await interaction.reply({ embeds: [supportEmbed], ephemeral: true })
//   }
// }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

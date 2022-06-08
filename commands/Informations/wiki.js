// const { MessageEmbed } = require('discord.js')

<<<<<<< HEAD
module.exports = {
	name: 'wiki',
	description: 'Envoit  un lien vers  le serveur wiki du bot',
	permissions: ['VIEW_CHANNEL'],
	ownerOnly: false,
	usage: 'wiki',
	examples: ['wiki'],
	category: 'informations',
	options: [],

	async runInteraction (client, interaction) {
		const wikiEmbed = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle('wiki')
			.setURL('https://achille-bosc.gitbook.io/ymule')

		await interaction.reply({ embeds: [wikiEmbed], ephemeral: true })
	}
}
=======
// module.exports = {
//   name: 'wiki',
//   description: 'Envoit  un lien vers  le serveur wiki du bot',
//   permissions: ['VIEW_CHANNEL'],
//   ownerOnly: false,
//   usage: 'wiki',
//   examples: ['wiki'],
//   category: 'informations',
//   options: [],

//   async runInteraction (client, interaction) {
//     const wikiEmbed = new MessageEmbed()
//       .setColor('BLURPLE')
//       .setTitle('wiki')
//       .setURL('https://achille-bosc.gitbook.io/ymule')

//     await interaction.reply({ embeds: [wikiEmbed], ephemeral: true })
//   }
// }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f

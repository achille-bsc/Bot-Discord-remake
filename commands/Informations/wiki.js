const { MessageEmbed } = require('discord.js')

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

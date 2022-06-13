// const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { morpion3x3 } = require('../../utils/handlers/MorpionUtil')

module.exports = {
	name: 'morpion',
	description: 'Permet de jouer au morpion contre le bot',
	permissions: ['VIEW_CHANNEL'],
	ownerOnly: false,
	usage: 'morpion',
	examples: ['morpion'],
	category: 'jeux',
	options: [
		{
			name: 'grille',
			description: 'Taille de la grille sur la quelle vous souhaitez jouer',
			type: 'STRING',
			required: true,
			choices: [
				{ name: '3x3', value: '3' },
				{ name: '4x4', value: '4' }
			]
		},
		{
			name: 'niveau',
			description: 'Niveau du bot contre le quel vous allez jouer',
			type: 'STRING',
			required: true,
			choices: [
				{ name: 'Facile', value: '1' },
				{ name: 'Normal', value: '2' },
				{ name: 'Difficile', value: '3' }
			]
		}

	],
	async runInteraction (client, interaction) {
		const grille = interaction.options.getString('grille')
		const level = interaction.options.getString('niveau')

		morpion3x3(interaction, level, grille)
	}

}

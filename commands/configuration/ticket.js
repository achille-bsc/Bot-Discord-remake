const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const langFr = require('../../languages/fr/Configs/ticket.json')
const langEn = require('../../languages/en/Configs/ticket.json')

module.exports = {
	name: 'ticket',
	description: 'Permet de mettre en place un système de ticket',
	permissions: ['ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'ticket',
	examples: ['ticket'],
	category: 'configuration',
	options: [
		{
			name: 'config',
			description: 'permet de configurer un nouveau salon de privaterooms',
			type: 'SUB_COMMAND_GROUP',
			options: [
				{
					name: 'activer',
					description: 'permet de configurer un nouveau salon de privaterooms',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'categorie',
							description: 'Dans quelle catégorie souhaitez-vous que les ticket soit une fois ouverts ?',
							type: 'CHANNEL',
							channelTypes: ['GUILD_CATEGORY'],
							required: true
						},
						{
							name: 'message',
							description: 'Message qui vas permettre l\'ouverture d\'un ticket ?',
							type: 'STRING',
							required: true
						},
						{
							name: 'open',
							description: 'Message lors de l\'ouverture d\'un ticket ?',
							type: 'STRING',
							required: true
						}
					]
				},
				{
					name: 'desactiver',
					description: 'Désactive le système de ticket pour ce serveur',
					type: 'SUB_COMMAND'
				}

			]
		}
	],
	async runInteraction (client, interaction) {
		const guild = await client.getGuild(interaction.guild)
		const lang = guild.langue === 'fr' ? langFr : langEn

		if (interaction.options.getSubcommand() === 'activer') {
			const categorie = interaction.options.getChannel('categorie')
			const message = interaction.options.getString('message')
			const open = interaction.options.getString('open')

			guild.ticketActivated = true
			guild.ticketCategorie = categorie.id
			guild.openMessage = open

			const embed = new MessageEmbed()
				.setTitle(`${lang.messageTitle}`)
				.setDescription(`${message}`)
				.setColor('BLURPLE')

			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('ticket')
						.setLabel(`${lang.button}`)
						.setStyle('SUCCESS')
				)

			await interaction.channel.send({ embeds: [embed], components: [row] })
			await guild.save()
			await interaction.reply({ content: 'Le système à correctement été configuré !', ephemeral: true })
		}
	}

}

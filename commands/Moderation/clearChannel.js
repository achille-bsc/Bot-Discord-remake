const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'clearchannel',
	description: 'Permet de réinitialiser un salon en le clonnant.',
	permissions: ['MANAGE_CHANNELS'],
	ownerOnly: false,
	usage: 'clearchannel',
	examples: ['clearchennel'],
	category: 'Modération',
	options: [],

	async runInteraction (client, interaction) {
		let stade = 0
		let newChann

		try {
			newChann = await interaction.channel.clone()
			stade = 1
			await interaction.channel.delete()
			stade = 2

			const embed = new MessageEmbed()
				.setTitle('Le salon à correctement été réinitialisé !')
				.setColor('GREEN')
			stade = 3
			newChann.send({ embeds: [embed], ephemeral: false })
			stade = 4
		} catch (error) {
			const embed = new MessageEmbed()
				.setTitle('Une erreur s\'est produite !')
				.setColor('RED')

			switch (stade) {
			case 1:
				embed.setDescription('Une erreur s\'est produite lors du clonnage du salon. Il se peut quer je n\'ai pas les permissions necessaires pour **Créer** un salon.')
				interaction.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed], ephemeral: true })
				break
			case 2:
				embed.setDescription('Une erreur s\'est produite lors de la suppression du salon d\'origine. Il se peut quer je n\'ai pas les permissions necessaires pour **Créer** ou **Supprimer** un salon.')
				try {
					interaction.channel.send({ content: `<@${interaction.user.id}>`, embeds: [embed], ephemeral: true })
				} catch (error) {
					newChann.send({ content: `<@${interaction.user.id}>`, embeds: [embed], ephemeral: true })
				}
				break
			case 3:
				embed.setDescription('Une erreur s\'est produite lors de la créaction du message. Veuillez contacter un administrateur du bot pour le prévenir de cette erreur !')
				newChann.send({ content: `<@${interaction.user.id}>`, embeds: [embed], ephemeral: true })
				break
			case 4:
				embed.setDescription('Une erreur s\'est produite lors de l\'envoit du message. Il se peut quer je n\'ai pas les permissions necessaires pour **Envoyer un Message** dans les salons.')
				newChann.send({ content: `<@${interaction.user.id}>`, embeds: [embed], ephemeral: true })
				break
			default:
				break
			}
		}

	}
}

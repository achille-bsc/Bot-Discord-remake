const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'ban',
	description: 'Permet de bannir définitivement ou non un membre du serveur',
	permissions: ['BAN_MEMBERS'],
	ownerOnly: false,
	usage: 'ban def/temp @member raison',
	examples: ['ban @exemple#1234 Pas gentil'],
	category: 'Modération',
	options: [
		{
			name: 'membre',
			description: 'membre à bannir',
			type: 'USER',
			required: true
		},
		{
			name: 'raison',
			description: 'Raison du ban',
			type: 'STRING',
			required: true
		}
	],

	async runInteraction (client, interaction) {
		const member = interaction.options.getUser('membre')
		const banReason = interaction.options.getString('raison')

		if(!member || !banReason) return

		try {
			member.ban({ reason: banReason })
			const embed = new MessageEmbed()
				.setTitle('Membre banni')
				.setColor('GREEN')
				.setDescription(`Le membre ${member.user.username} à correctement été banni !`)

			interaction.reply({ emebds: [embed], ephemeral: true })
		} catch (error) {
			const embed = new MessageEmbed()
				.setTitle('Une erreur s\'est produite !')
				.setColor('RED')
				.setDescription('Il m\'est impossible de bannir le membre en question. Veuillez vérifier que mon rôle est bien suppérieur au plus haut rôle de ce membre. Il est également possible que vous n\'ayez pas les permissions necessaires pour bannir ce membre.')

			interaction.reply({ embeds: [embed], ephemeral: true })
		}
	}
}

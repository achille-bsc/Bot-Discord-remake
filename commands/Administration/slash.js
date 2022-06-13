const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'slash',
	description: 'permet de gérer les commandes slash',
	permissions: ['ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'slash <update/off>',
	examples: ['premium update', 'premium off'],
	category: 'Configuration',
	options: [
		{
			name: 'update',
			description: 'met à jours les slash commands du serveur',
			type: 'SUB_COMMAND'
		},
		{
			name: 'off',
			description: 'desactive les slash commandes du serveur',
			type: 'SUB_COMMAND'
		}

	],
	async runInteraction (client, interaction) {
		// const guild = await client.getGuild(interaction.guild)
		// const lang = guild.langue === 'fr' ? langFr : langEn

		if (interaction.options.getSubcommand() === 'update') {
			const guildObject = await client.guilds.cache.get(interaction.guild.id)
			interaction.deferReply()
			interaction.deleteReply()
			await guildObject.commands.set(client.commands.map(cmd => cmd)).then(async () => {
				const embed = new MessageEmbed()
					.setTitle('Slash commandes Mises à jours')
					.setColor('GREEN')
				await interaction.editReply({ embeds: [embed] })
			})
		} else if (interaction.options.getSubcommand() === 'off') {
			interaction.guild.commands.set([]).then(() => {
				const embed = new MessageEmbed()
					.setTitle('Les slash commands ont correctement été désactivés !')
					.setColor('RED')

				interaction.reply({ embeds: [embed], ephemeral: true })
			})
		}
	}
}

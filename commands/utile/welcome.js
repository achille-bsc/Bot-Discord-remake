const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const buttons = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('accept-button')
			.setLabel('Accepter')
			.setStyle('SUCCESS')
		,
		new MessageButton()
			.setCustomId('refuse-button')
			.setLabel('Refuser')
			.setStyle('DANGER')
		,
	)
;

const embed = new MessageEmbed()
	.setTitle(`Charte du serveur`)
	.setDescription(`Règles...........`)
	.setTimestamp()
	.setFooter({ text: `Bienvenue sur le serveur !` })
;

module.exports = {
	name: 'welcome',
	description: `Permet d'envoyer l'embed du règlement`,
	permissions: ['SEND_MESSAGES'],
	ownerOnly: true,
	usage: 'welcome',
	examples: ['welcome'],
	category: 'utile',
	async run (client, message, args) {
		await message.channel.send({ embeds: [embed], components: [buttons] })
	},
	async runInteraction (client, interaction) {
		await interaction.reply({ embeds: [embed], components: [buttons] })
	}
};
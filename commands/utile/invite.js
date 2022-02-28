const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
	name: 'invite',
	description: 'Donne le lien d\'invitation du bot',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'invite',
	examples: ['invite'],
	category: 'utile',
	async run (client, message, args) {

		const embed = new MessageEmbed()
			.setTitle('Inviter le bot')
			.setURL('https://discord.com/api/oauth2/authorize?client_id=902293972091801620&permissions=8&scope=bot%20applications.commands')
			.setColor('#4ed5f8')
		;
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Inviter')
					.setStyle('LINK')
					.setURL('https://discord.com/api/oauth2/authorize?client_id=902293972091801620&permissions=8&scope=bot%20applications.commands')
			)
		;
		message.reply({ embeds: [embed], components: [row] })
		
	},
	async runInteraction (client, interaction) {
		
		const embed = new MessageEmbed()
		.setTitle('Inviter le bot')
		.setURL('https://discord.com/api/oauth2/authorize?client_id=902293972091801620&permissions=8&scope=bot%20applications.commands')
		.setColor('#4ed5f8')
	;
	const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('Inviter')
				.setStyle('LINK')
				.setURL('https://discord.com/api/oauth2/authorize?client_id=902293972091801620&permissions=8&scope=bot%20applications.commands')
		)
	;
	interaction.reply({ embeds: [embed], components: [row], ephemeral: true })

	}
};
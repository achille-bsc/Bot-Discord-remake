const { MessageEmbed } = require('discord.js')


module.exports = {
	name: 'staff',
	description: 'Donne la liste des membres du staff du bot ainsi que leurs rôles',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'staff',
	examples: ['staff'],
	category: 'utile',
	async run (client, message, args) {
		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('Membre Support du BOT')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Dévelopement du Bot', value: `\`@Achille - Dev\``, inline: false },
				{ name: 'Développement du Site', value: `\`@Achille - Dev\``, inline: false },	
                { name: 'Paterne de la structure du code', value: `\`GetCodingKnowledge [YouTubeur]\`**,** \`Achille - Dev\``, inline: false },			
			)
			.setTimestamp()
			.setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() })
		;

		message.channel.send({ embeds: [embed] });
	},
	async runInteraction (client, interaction) {
		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('Membre Support du BOT')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Dévelopement du Bot', value: `\`@Achille - Dev\``, inline: false },
				{ name: 'Développement du Site', value: `\`@Achille - Dev\``, inline: false },
				{ name: 'Paterne de la structure du code', value: `\`GetCodingKnowledge [YouTubeur]\`**,** \`Achille - Dev\``, inline: false },
			)
			.setTimestamp()
			.setFooter({ text: interaction.user.username, iconeURL: interaction.user.displayAvatarURL() })
		;

		interaction.reply({ embeds: [embed], ephemeral: true })
	}
};
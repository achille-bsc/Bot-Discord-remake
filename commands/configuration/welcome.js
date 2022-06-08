// const { MessageEmbed } = require('discord.js')
// const langFr = require('../../languages/fr/Configs/welcome.json')
// const langEn = require('../../languages/en/Configs/welcome.json')

<<<<<<< HEAD
module.exports = {
	name: 'welcome',
	description: 'Permet de créer un message de validation du règlement.',
	permissions: ['ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'welcome',
	examples: ['welcome'],
	category: 'configuration',
	options: [
		{
			name: 'activer',
			description: 'Activer la commande',
			type: 'SUB_COMMAND',
			options: [
				{
					name: 'salon',
					description: 'Salon dans le quel vous souhaitez que les message de bienvenue soit envoyés',
					type: 'CHANNEL',
					channelTypes: ['GUILD_TEXT'],
					required: true
				},

				{
					name: 'message',
					description: 'Message à afficher lors de \'arrivée d\'un membre sur le serveur',
					type: 'STRING',
					required: false
				}
			]
		},
		{
			name: 'desactiver',
			description: 'Désactiver la commande',
			type: 'SUB_COMMAND'
		}
	],
	async runInteraction (client, interaction) {
		const guild = await client.getGuild(interaction.guild)
		const lang = (guild.langue === 'fr' ? langFr : langEn)

		const channel = interaction.options.getChannel('salon')
		const message = interaction.options.getString('message')

		if (interaction.options.getSubcommand() === 'activer') {
			guild.welcomeMessageEnabled = true
			guild.welcomeChannel = channel.id
			guild.welcomeMessage = message || guild.goodByeMessage
		}

		guild.save().then(() => {
			const embedDesactive = new MessageEmbed()
				.setTitle(`${lang.embedTitleCorp} ${interaction.options.getSubcommand() === 'activer' ? (lang.embedTitleActive) + '🔓' : (lang.embedTitleDesactive) + '🔒'}`)
				.setDescription(`${interaction.options.getSubcommand() === 'activer' ? (lang.embedDescriptionActivated) + ' ✅' : (lang.embedDescriptionDesactivated) + ' ✅'}`)
				.setColor('GREEN')
				.setTimestamp()
				.setFooter({ text: `${interaction.options.getSubcommand() === 'activer' ? (lang.embedFooterActivated) : (lang.embedFooterDesactived)}` })
			interaction.reply({ embeds: [embedDesactive], ephemeral: true })
		}).catch((error) => {
			const erreurDesactive = new MessageEmbed()
				.setColor('RED')
				.setTitle(lang.erreurTitle)
				.setDescription(`${lang.erreurDescription}\n\`\`\`${error}\`\`\``)

			interaction.reply({ embeds: [erreurDesactive], ephemeral: true })
		})
	}
}
=======
// module.exports = {
//   name: 'welcome',
//   description: 'Permet de créer un message de validation du règlement.',
//   permissions: ['ADMINISTRATOR'],
//   ownerOnly: false,
//   usage: 'welcome',
//   examples: ['welcome'],
//   category: 'configuration',
//   options: [
//     {
//       name: 'activer',
//       description: 'Activer la commande',
//       type: 'SUB_COMMAND',
//       options: [
//         {
//           name: 'salon',
//           description: 'Salon dans le quel vous souhaitez que les message de bienvenue soit envoyés',
//           type: 'CHANNEL',
//           channelTypes: ['GUILD_TEXT'],
//           required: true
//         },

//         {
//           name: 'message',
//           description: 'Message à afficher lors de \'arrivée d\'un membre sur le serveur',
//           type: 'STRING',
//           required: false
//         }
//       ]
//     },
//     {
//       name: 'desactiver',
//       description: 'Désactiver la commande',
//       type: 'SUB_COMMAND'
//     }
//   ],
//   async runInteraction (client, interaction) {
//     const guild = await client.getGuild(interaction.guild)
//     const lang = (guild.langue === 'fr' ? langFr : langEn)

//     const channel = interaction.options.getChannel('salon')
//     const message = interaction.options.getString('message')

//     if (interaction.options.getSubcommand() === 'activer') {
//       guild.welcomeMessageEnabled = true
//       guild.welcomeChannel = channel.id
//       guild.welcomeMessage = message || guild.goodByeMessage
//     }

//     guild.save().then(() => {
//       const embedDesactive = new MessageEmbed()
//         .setTitle(`${lang.embedTitleCorp} ${interaction.options.getSubcommand() === 'activer' ? (lang.embedTitleActive) + '🔓' : (lang.embedTitleDesactive) + '🔒'}`)
//         .setDescription(`${interaction.options.getSubcommand() === 'activer' ? (lang.embedDescriptionActivated) + ' ✅' : (lang.embedDescriptionDesactivated) + ' ✅'}`)
//         .setColor('GREEN')
//         .setTimestamp()
//         .setFooter({ text: `${interaction.options.getSubcommand() === 'activer' ? (lang.embedFooterActivated) : (lang.embedFooterDesactived)}` })
//       interaction.reply({ embeds: [embedDesactive], ephemeral: true })
//     }).catch((error) => {
//       const erreurDesactive = new MessageEmbed()
//         .setColor('RED')
//         .setTitle(lang.erreurTitle)
//         .setDescription(`${lang.erreurDescription}\n\`\`\`${error}\`\`\``)

//       interaction.reply({ embeds: [erreurDesactive], ephemeral: true })
//     })
//   }
// }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f

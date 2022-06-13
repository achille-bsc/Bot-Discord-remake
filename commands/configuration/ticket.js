const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const langFr = require('../../languages/fr/Configs/ticket.json')
const langEn = require('../../languages/en/Configs/ticket.json')

<<<<<<< HEAD
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
=======
<<<<<<< HEAD
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
			description: 'permet de configurer le système de ticket lors de son activation',
			type: 'SUB_COMMAND_GROUP',
			options: [
				{
					name: 'activer',
					description: 'permet de configurer un nouveau salon de privaterooms',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'categorie',
							description: 'Dans quelle catégorie souhaitez-vous que les ticket soit une fois ouverts',
							type: 'CHANNEL',
							channelTypes: ['GUILD_CATEGORY'],
							required: true
						},
						{
							name: 'handler-message',
							description: 'Message qui vas permettre l\'ouverture d\'un ticket',
							type: 'STRING',
							required: true
						},
						{
							name: 'open-message',
							description: 'Message lors de l\'ouverture d\'un ticket',
							type: 'STRING',
							required: true
						},
						{
							name: 'mention',
							description: 'Mentionne le membre dans son ticket lors de son ouverture',
							type: 'BOOLEAN',
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

		// TODO Ajouter un système pour supprimer les message de ticket handlers de la db automatiquement après suppression et ajouter un système permettant la suppression de ceux-ci via un selecteur comme pour les privaterooms

		if (interaction.options.getSubcommand() === 'activer') {
			if ((guild.ticketHandlers >= 2 && !guild.premium) || (guild.ticketHandlers >= 2 && !guild.activated)) {
				const errEmbed = new MessageEmbed()
					.setTitle(lang.errTitle)
					.setDescription(lang.errDescription)
					.setColor('RED')
				return interaction.reply({ embeds: [errEmbed], ephemeral: true })
			}
			const categorie = interaction.options.getChannel('categorie')
			const message = interaction.options.getString('handler-message')
			const open = interaction.options.getString('open-message')
			const ping = interaction.options.getBoolean('mention')

			guild.ticketActivated = true
			guild.ticketCategorie = categorie.id
			guild.openMessage = open
			guild.activeTicketMention = ping

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
			guild.ticketHandlers = guild.ticketHandlers + 1
			await guild.save()
			await interaction.reply({ content: 'Le système à correctement été configuré !', ephemeral: true })
		}
	}
=======
// module.exports = {
//   name: 'ticket',
//   description: 'Permet de mettre en place un système de ticket',
//   permissions: ['ADMINISTRATOR'],
//   ownerOnly: false,
//   usage: 'ticket',
//   examples: ['ticket'],
//   category: 'configuration',
//   options: [
//     {
//       name: 'config',
//       description: 'permet de configurer un nouveau salon de privaterooms',
//       type: 'SUB_COMMAND_GROUP',
//       options: [
//         {
//           name: 'activer',
//           description: 'permet de configurer un nouveau salon de privaterooms',
//           type: 'SUB_COMMAND',
//           options: [
//             {
//               name: 'categorie',
//               description: 'Dans quelle catégorie souhaitez-vous que les ticket soit une fois ouverts ?',
//               type: 'CHANNEL',
//               channelTypes: ['GUILD_CATEGORY'],
//               required: true
//             },
//             {
//               name: 'message',
//               description: 'Message qui vas permettre l\'ouverture d\'un ticket ?',
//               type: 'STRING',
//               required: true
//             },
//             {
//               name: 'open',
//               description: 'Message lors de l\'ouverture d\'un ticket ?',
//               type: 'STRING',
//               required: true
//             }
//           ]
//         },
//         {
//           name: 'desactiver',
//           description: 'Désactive le système de ticket pour ce serveur',
//           type: 'SUB_COMMAND'
//         }
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

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

<<<<<<< HEAD
      await interaction.channel.send({ embeds: [embed], components: [row] })
      await guild.save()
      await interaction.reply({ content: 'Le système à correctement été configuré !', ephemeral: true })
    }
  }
=======
//       await interaction.channel.send({ embeds: [embed], components: [row] })
//       await guild.save()
//       await interaction.reply({ content: 'Le système à correctement été configuré !', ephemeral: true })
//     }
//   }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

}

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

<<<<<<< HEAD
  ],
  async runInteraction (client, interaction) {
    // const guild = await client.getGuild(interaction.guild)
    // const lang = guild.langue === 'fr' ? langFr : langEn
=======
	],
	async runInteraction (client, interaction) {
		const guild = await client.getGuild(interaction.guild)
		const lang = guild.langue === 'fr' ? langFr : langEn
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

<<<<<<< HEAD
		if (interaction.options.getSubcommand() === 'update') {
			const guildObject = await client.guilds.cache.get(interaction.guild.id)
			await guildObject.commands.set(client.commands.map(cmd => cmd))
			const embed = new MessageEmbed()
				.setTitle(`${lang.trueTitle}`)
				.setColor('GREEN')
				.setFooter({ text: `${lang.footer} ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL(true)}` })
			await interaction.reply({ embeds: [embed] })
		} else if (interaction.options.getSubcommand() === 'off') {
			interaction.guild.commands.set([])
			const embed = new MessageEmbed()
				.setTitle(`${lang.falseTitle}`)
				.setColor('RED')
=======
    if (interaction.options.getSubcommand() === 'update') {
      const guildObject = await client.guilds.cache.get(interaction.guild.id)
      interaction.deferReply()

      await guildObject.commands.set(client.commands.map(cmd => cmd)).then(async () => {
        const embed = new MessageEmbed()
          .setTitle('Slash commandes Mises à jours')
          .setColor('GREEN')
        await interaction.editReply({ embeds: [embed] })
      })
    } else if (interaction.options.getSubcommand() === 'off') {
<<<<<<< HEAD
      interaction.deferReply()

      interaction.guild.commands.set([]).then(() => {
        const embed = new MessageEmbed()
          .setTitle('Les slash commands ont correctement été désactivés !')
          .setColor('RED')

        interaction.repeditReokyly({ embeds: [embed], ephemeral: true })
      })
    }
  }
=======
      interaction.guild.commands.set([])
      const embed = new MessageEmbed()
        .setTitle(`${lang.falseTitle}`)
        .setColor('RED')
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f

			interaction.reply({ embeds: [embed], ephemeral: true })
		}
	}
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0
}

const { MessageEmbed } = require('discord.js')

const langFr = require('../../languages/fr/Admins/slash.json')
const langEn = require('../../languages/en/Admins/slash.json')

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
		const guild = await client.getGuild(interaction.guild)
		const lang = guild.langue === 'fr' ? langFr : langEn

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
      await guildObject.commands.set(client.commands.map(cmd => cmd))
      const embed = new MessageEmbed()
        .setTitle(`${lang.trueTitle}`)
        .setColor('GREEN')
        .setFooter({ text: `${lang.footer} ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL(true)}` })
      await interaction.editReply({ embeds: [embed] })
    } else if (interaction.options.getSubcommand() === 'off') {
      interaction.guild.commands.set([])
      const embed = new MessageEmbed()
        .setTitle(`${lang.falseTitle}`)
        .setColor('RED')
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f

			interaction.reply({ embeds: [embed], ephemeral: true })
		}
	}
}

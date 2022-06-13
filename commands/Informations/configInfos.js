const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/Informations/configInfos.json')
const langEn = require('../../languages/en/Informations/configInfos.json')

<<<<<<< HEAD
module.exports = {
  name: 'configinfos',
  description: 'Donne des infos sur la configuration du bot',
  permissions: ['VIEW_CHANNEL'],
  ownerOnly: false,
  usage: 'infos',
  examples: ['infos'],
  category: 'informations',
  options: [],
=======
<<<<<<< HEAD
module.exports = {
	name: 'configinfos',
	description: 'Donne des infos sur la configuration du bot',
	permissions: ['VIEW_CHANNEL'],
	ownerOnly: false,
	usage: 'infos',
	examples: ['infos'],
	category: 'informations',
	options: [],

	async runInteraction (client, interaction) {
		const guild = await client.getGuild(interaction.guild)
		const lang = guild.langue === 'fr' ? langFr : langEn

		const pingEmbed = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle(lang.title)
			.setDescription(lang.description)
			.addField(lang.welcome, `\`${guild.welcomeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
			.addField(lang.goodbye, `\`${guild.goodByeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
			.addField(lang.premium, `**\`${guild.premium ? lang.yes : lang.no}\`**`, true)
			.addField(lang.premiumActive, `**\`${(guild.premium && guild.activated) ? lang.yes : lang.no}\`**`, true)
			.setTimestamp()
			.setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

		await interaction.reply({ embeds: [pingEmbed], ephemeral: true })
	}
}
=======
// module.exports = {
//   name: 'configinfos',
//   description: 'Donne des infos sur la configuration du bot',
//   permissions: ['VIEW_CHANNEL'],
//   ownerOnly: false,
//   usage: 'infos',
//   examples: ['infos'],
//   category: 'informations',
//   options: [],
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    const pingEmbed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(lang.title)
      .setDescription(lang.description)
      .addField(lang.welcome, `\`${guild.welcomeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
      .addField(lang.goodbye, `\`${guild.goodByeMessageEnabled ? lang.activated : lang.desactivated}\``, true)
      .addField(lang.premium, `**\`${guild.premium ? lang.yes : lang.no}\`**`, true)
      .addField(lang.premiumActive, `**\`${(guild.premium && guild.activated) ? lang.yes : lang.no}\`**`, true)
      .setTimestamp()
      .setFooter({ text: `${lang.footer} ${interaction.member.user.tag}`, avatarURL: `${interaction.member.user.displayAvatarURL(true)}` })

<<<<<<< HEAD
    await interaction.reply({ embeds: [pingEmbed], ephemeral: true })
  }
}
=======
//     await interaction.reply({ embeds: [pingEmbed], ephemeral: true })
//   }
// }
>>>>>>> 27652c02e5c049b01c6fbd3b75c66f0d6162182f
>>>>>>> 61309eb7478fef3ea2721e9c1f7333cc3d3f18e0

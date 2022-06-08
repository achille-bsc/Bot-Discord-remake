const { MessageEmbed } = require('discord.js')
const langFr = require('../../languages/fr/selectors/privateromms.json')
const langEn = require('../../languages/en/selectors/privaterooms.json')

module.exports = {
	name: 'privateroom',
	async runInteraction (client, interaction) {
		const guild = await client.getGuild(interaction.guild)
		const lang = guild.langue === 'fr' ? langFr : langEn

		const channel = interaction.guild.channels.cache.get(interaction.values[0])
		try {
			await interaction.guild.channels.cache.get(interaction.values[0]).delete()
		} catch (e) {
			const errEmbed = new MessageEmbed()
				.setTitle(`${lang.deleteErrorTitle}`)
				.setDescription(`${lang.deleteErrorDescription}`)
			return interaction.reply({ embeds: [errEmbed], ephemeral: true })
		}
		const endEmbed = new MessageEmbed()
			.setTitle(`${lang.deleteSuccessDescription1}`)
			.setDescription(`${lang.deleteSuccessDescription1} \`${channel.name}\` ${lang.deleteSuccessDescription2}`)
			.setColor('GREEN')
		interaction.reply({ embeds: [endEmbed], ephemeral: true })
	}
}

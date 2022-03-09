const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'rolereact',
	async runInteraction (client, interaction) {
		const role = interaction.guild.roles.cache.get(interaction.customId.slice('roleadd-'.length))
		interaction.member.roles.add(role)
		if (!role) {
			interaction.rply({ ephemeral: true, content: `Le rôle est introuvable !` })
		} else {
			interaction.reply({ ephemeral :true, content: `Le rôle \`${role.name}\` vous à coorectement été ajouté !` })
		}
	}
};
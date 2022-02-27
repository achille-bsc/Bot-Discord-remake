const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
	name: 'userinfo',
	type: 'USER',
	async runInteraction (client, interaction) {
		const member = await interaction.guild.members.fetch(interaction.targetId)


		const embed = new MessageEmbed()
			.setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://media.discordapp.net/attachments/947514478449270855/947514578584084540/robot.png' : 'https://media.discordapp.net/attachments/947514478449270855/947514578126901388/human.png' })
			.setColor('#4e48f7')
			.setImage(member.user.displayAvatarURL())
			.addFields(
				{ name: 'Nom', value: `${member.displayName}`, inline: true },
				{ name: 'Administrateur', value: `${member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ? '🟢' : '🔴'}`, inline: true },
				{ name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
				{ name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', ' ')}`, inline: false },
				{ name: 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000 )}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`, inline: true },
				{ name: 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000 )}:f> (<t:${parseInt(member.joinedTimestamp / 1000 )}:R>)`, inline: true }
			)
			
		;
		interaction.reply({ embeds: [embed], ephemeral: true });
	}
};
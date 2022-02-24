const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'ping',
	description: 'Donne la latence du bot ainsi que son le temps depuis son dernier démarage',
	run: (client, message, args) => {
		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('🏓 Pong')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Latence', value: `\`${client.ws.ping}\`ms`, inline: false },
				{ name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },				
			)
			.setTimestamp()
			.setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() })
		;

		message.channel.send({ embeds: [embed] });
	},
	runSlash: (client, interaction) => {
		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('🏓 Pong')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Latence', value: `\`${client.ws.ping}\`ms`, inline: false },
				{ name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },				
			)
			.setTimestamp()
			.setFooter({ text: interaction.user.username, iconeURL: interaction.user.displayAvatarURL() })
		;
		interaction.reply({ embeds: [embed], ephemeral: true });
	}
};
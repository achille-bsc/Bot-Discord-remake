const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'ping',
	description: 'Donne la latence du bot et de l\'API ainsi que son le temps depuis son dernier démarage',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'ping',
	examples: ['ping'],
	category: 'utile',
	async run (client, message, args) {
		const tryPong = await message.channel.send("Calcul en cours... Veuillez patienter quelques instants")

		await waiting(1000)

		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('🏓 Pong')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
				{ name: 'Latance BOT', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}\`\`\``, inline: true },
				{ name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },
			)
			.setTimestamp()
			.setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() })
		;

		tryPong.edit({ content: null, embeds: [embed] });
	},
	async runInteraction (client, interaction) {
		const tryPong = await interaction.reply({ content: "Calcul en cours... Veuillez patienter quelques instants", fetchReply: true})

		await waiting(1000)

		const embed = new MessageEmbed()
			.setColor('#4ed5f8')
			.setTitle('🏓 Pong')
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{ name: 'Latence API', value: `\`\`\`${client.ws.ping} ms\`\`\``, inline: true },
				{ name: 'Latance BOT', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp} ms\`\`\``, inline: true },
				{ name: 'Uptime', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: false },				
			)
			.setTimestamp()
			.setFooter({ text: interaction.user.username, iconeURL: interaction.user.displayAvatarURL() })
		;
		interaction.editReply({ content: null, embeds: [embed] });
	}
};

async function waiting(time = 5000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
	name: 'clearchannel',
	description: 'Permet de vider un salon',
	async run (client, message, args) {
		if (!message.author.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande.' });
		await message.channel.delete().then(async channel => {
			channel.clone(this.name).then(async chann => {
				chann.send( { embeds: [new MessageEmbed()
					.setColor('#4ed5f8')
					.setTitle('✅ Le salon à bien été réinitialisé !')
					.setFooter({ text: message.author.username, iconeURL: message.author.displayAvatarURL() })]}
				).then(message => {
					setTimeout(() => {
						try {
							message.delete();
						}
						catch (e) {
							return;
						}
					}, 5000);
				});
			});
		});
	},
	runSlash: async (client, interaction) => {
		await interaction.channel.delete().then(async channel => {
			if (!interaction.user.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({ content: 'Vous n\'avez pas la permission d\'utiliser cette commande.', ephemeral: true });
			channel.clone(this.name).then(async chann => {
				chann.send( { embeds: [new MessageEmbed()
					.setColor('#4ed5f8')
					.setFooter({ text: interaction.user.username, iconeURL: interaction.user.displayAvatarURL() })
					.setTitle('✅ Le salon à bien été réinitialisé !')]}
				).then(message => {
					setTimeout(() => {
						try {
							message.delete();
						}
						catch (e) {
							return;
						}
					}, 5000);
				});
			});
		});
	}
};
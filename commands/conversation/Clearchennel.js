const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
	name: 'clearchannel',
	description: 'Permet de vider un salon',
    permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES', 'MANAGE_CHANNELS'],
	ownerOnly: false,
	usage: 'clearchannel',
	examples: ['clearchannel'],
	category: 'conversation',
	async run (client, message, args) {
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
	async runInteraction (client, interaction) {
		await interaction.channel.delete().then(async channel => {
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
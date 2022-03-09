const { MessageEmbed, Permissions } = require('discord.js');
const { required } = require('nodemon/lib/config');
const guildMemberAdd = require('../../events/guild_members/guildMemberAdd');

module.exports = {
	name: 'emit',
	description: 'Emettre un évènement au choix',
    permissions: ['SEND_MESSAGES', 'ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'emit [evenement]',
	examples: ['emit guildMemberAdd', 'emit guildMemberRemove'],
	category: 'administrateur',
	async run (client, message, args) {
		if(message.author.id != message.guild.ownerId) return message.reply({content: `Vous devez être le créateur du serveur pour effectuer cette commande !`})
		if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove|guildCreate)$/)) return message.reply({ content: `Merci d'entrer un évènement valide (\`guildMemberAdd\`, \`guildMemberRemove\`)` });

		if (args[0] == 'guildMemberAdd') {
			client.emit('guildMemberAdd', message.member);
			message.reply( 'Evenement guildMemberAdd émit !' )
		} else if (args[0] == 'guildCreate') {
			client.emit('guildCreate', message.guild);
			message.reply( 'Evenement guildCreate émit !' )
		} else if (args[0] == 'guildMemberRemove') {
			client.emit('guildMemberRemove', message.member);
			message.reply( 'Evenement guildMemberRemove émit !' )
		}
	},
	options: [
		{
			name: 'event',
			description: 'Choisir un évènement à emettre',
			type: 'STRING',
			required: true,
			choices: [
				{
					name: 'guildMemberAdd',
					value: 'guildMemberAdd'
				},
				{
					name: 'guildMemberRemove',
					value: 'guildMemberRemove'
				},
				{
					name: 'guildCreate',
					value: 'guildCreate'
				},
			],
		}
	],
	async runInteraction (client, interaction) {
		if(interaction.user.id != interaction.guild.ownerId) return interaction.reply({content: `Vous devez être le créateur du serveur pour effectuer cette commande !`, ephemeral: true})
		const evtChoices = interaction.options.getString('event');

		if (evtChoices == 'guildMemberAdd') {
			client.emit ('guildMemberAdd', interaction.member);
			interaction.reply({ content: 'Event guildMemberAdd émit !', ephemeral: true })
		} else if (evtChoices == 'guildCreate') {
			client.emit('guildCreate', interaction.guild);
			interaction.reply( 'Evenement guildCreate émit !' )
		} else if (evtChoices == 'guildMemberRemove') {
			client.emit('guildMemberRemove', interaction.member);
			interaction.reply({ content: 'Event guildMemberRemove émit !', ephemeral: true })
		}
	}
};
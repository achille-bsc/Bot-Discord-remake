const { MessageEmbed, Permissions } = require('discord.js');
const { required } = require('nodemon/lib/config');
const guildMemberAdd = require('../../events/guild_members/guildMemberAdd');

module.exports = {
	name: 'emit',
	description: 'Emettre un évènement au choix',
	run (client, message, args) {
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.reply(`Vous n'avez pas la permission d'utiliser cette commande`)
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
	runSlash (client, interaction) {
		if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({content:`Vous n'avez pas la permission d'utiliser cette commande`, ephemeral: true})
		
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
const { MessageEmbed } = require('discord.js');
const { required } = require('nodemon/lib/config');
const guildMemberAdd = require('../../events/guild_members/guildMemberAdd');
const admins = require('../../local storage/admins_bot.json')

module.exports = {
	name: 'emit',
	description: 'Emettre un évènement au choix !',
	run: (client, message, args) => {
		if (!admins.admins.includes(message.author.id)) return;
		if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply({ content: `Merci d'entrer un évènement valide (\`guildMemberAdd\`, \`guildMemberRemove\`)` });

		if (args[0] == 'guildMemberAdd') {
			client.emit('guildMemberAdd', message.member);
			message.reply( 'Evenement guildMemberAdd émit !' )
		} else {
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
			],
		}
	],
	runSlash: (client, interaction) => {
		if (!admins.admins.includes(interaction.user.id)) interaction.deferReply({ ephemeral: true })
		const evtChoices = interaction.options.getString('event');

		if (evtChoices == 'guildMemberAdd') {
			client.emit('guildMemberAdd', interaction.member);
			interaction.reply({ content: 'Evenement guildMemberAdd émit !', ephemeral: true })
		} else if (evtChoices == 'guildMemberRemove') {
			client.emit('guildMemberRemove', interaction.member);
			interaction.reply({ content: 'Evenement `guildMemberRemove` émit !', ephemeral: true })
		}
	}
};
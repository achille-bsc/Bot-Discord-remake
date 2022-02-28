const { MessageEmbed } = require('discord.js');
const { required } = require('nodemon/lib/config');
const guildMemberAdd = require('../../events/guild_members/guildMemberAdd');

module.exports = {
	name: 'poll',
	description: 'Postez Votre propre sondage',
	permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
	ownerOnly: false,
	usage: 'poll [question]',
	examples: ['poll [Aimez-vous les pattes ?]'],
	category: 'utile',
	async run (client, message, args) {
		if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply({ content: `Merci d'entrer une question pour votre sondage !` });

		const embed = new MessageEmbed()
			.setTitle('Sondage !')
			.setColor('#4ed5f8')
			.setDescription(args.slice(0).join(' '))
			.addFields([
				{ name: '✅', value: 'Pour', inline: true },
				{ name: '➖', value: 'Sans Avis', inline: true },
				{ name: '❌', value: 'Contre', inline: true }
			])
			.setTimestamp()
			.setFooter({ text: `Nouveau sondage généré par ${message.user.tag} !` })
		;

		const poll = await message.reply({ embeds: [embed] })
		poll.react('✅');
		poll.react('➖');
		poll.react('❌');
		
	},
	options: [
		{
			name: 'titre',
			description: 'Tappez le titre de votre donsage',
			type: 'STRING',
			required: true,
		},
		{
			name: 'contenu',
			description: 'Tappez la question de votre donsage',
			type: 'STRING',
			required: true,
		},
		{
			name: 'couleur',
			description: 'Couleur du message',
			type: 'STRING',
			required: false,
			choices: [
				{
					name: 'rouge',
					value: 'RED'
				},
				{
					name: 'bleu',
					value: 'BLUE'
				},
				{
					name: 'vert',
					value: 'GREEN'
				},
				{
					name: 'noir',
					value: 'NOT_QUITE_BLACK'
				},
				{
					name: 'blanc',
					value: 'WHITE'
				},
				{
					name: 'rose',
					value: 'LUMINOUS_VIVID_PINK'
				},
			],
		},
	],
	async runInteraction (client, interaction) {
		const pollTitle = interaction.options.getString('titre');
		const pollContent = interaction.options.getString('contenu');
		const color = interaction.options.getString('couleur') || '#4ed5f8'
		

		const embed = new MessageEmbed()
			.setTitle(pollTitle)
			.setColor(color)
			.setDescription(pollContent)
			.addFields([
				{ name: '✅', value: 'Pour', inline: true },
				{ name: '➖', value: 'Sans Avis', inline: true },
				{ name: '❌', value: 'Contre', inline: true }
			])
			.setTimestamp()
			.setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag} !` })
		;

		const poll = await interaction.reply({ embeds: [embed], fetchReply: true })
		poll.react('✅');
		poll.react('➖');
		poll.react('❌');
	}
};
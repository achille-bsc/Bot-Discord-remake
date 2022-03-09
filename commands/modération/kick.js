const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Permet d\'expulser un utilisateur du serveur',
    permissions: ['KICK_MEMBERS'],
	ownerOnly: false,
	usage: 'kick [@utilisateur] [raison]',
	examples: ['kick @exemple Raid', 'kick @exemple spamm' , 'kick @exmple Pub'],
	category: 'modération',
	async run (client, message, args) {
		if (!args[0]) return message.reply('Veuillez spécifier un membre à expulser');
		if (!args[1]) return message.rply('Veuillez spécifier la raison d\'expultion du membre');

		const target = message.mentions.members.find(m => m.id)
		if(!target) return message.reply('Le membre que vous tenter d\'xpulser est introuvable !');
		const reason = args.slice(1).join(' ');

		if (!target.kickable) return message.reply('Ce membre ne peut pas être banni par le bot. Vous devriez augmenter les permissions du bot sur le serveur pour qu\'il puisse expulser l\'utilisateur !')
		

		const kickMemberEmbed = new MessageEmbed()
			.setTitle(`Vous avez été banni(e) !`)
			.setColor('DARK_RED')
			.setDescription(`Vous vennez d'être banni(e) du serveur \`${message.guild.name}\` (\`${message.guild.id}\`) pour la raison suivante => \`\`\`${reason}\`\`\``)
		;
		await target.send({embeds: [kickMemberEmbed]})
		target.kick(reason);

		const kickEmbed = new MessageEmbed()
			.setTitle(`Le membre ${target} viens d'être kick !`)
			.setColor('ORANGE')
			.addFields([
				{ name: `Membre banni`, value: `\`${target.tag}\` (\`${target.id}\`)` },
				{ name: `Expulsé par`, value: `\`${message.author.tag}\` (\`${message.author.id}\`)` },
				{ name: `Raison`, value: `\`${reason}\`` }
			]
		);
		message.channel.send({ embeds: [kickEmbed] })
	},
	options: [
		{
			name: 'membre',
			description: 'Membre à expulser du serveur',
			type: 'USER',
			required: true,
		},
		{
			name: 'raison',
			description: 'Raison d\'expulstion du serveur',
			type: 'STRING',
			required: true,
		},
		
	],
	async runInteraction (client, interaction) {

		const target = interaction.options.getMember('membre');
		const reason = interaction.options.getString('raison');

		if (!target.kickable) return interaction.reply({ content: 'Ce membre ne peut pas être banni par le bot. Vous devriez augmenter les permissions du bot sur le serveur pour qu\'il puisse expulser l\'utilisateur !', ephemeral: true })
		

		try { 
			const kickMemberEmbed = new MessageEmbed()
				.setTitle(`Vous avez été banni(e) !`)
				.setColor('DARK_RED')
				.setDescription(`Vous vennez d'être banni(e) du serveur \`${interaction.guild.name}\` (\`${interaction.guild.id}\`) pour la raison suivante => \`\`\`${reason}\`\`\``)
			;
			await target.send({embeds: [kickMemberEmbed]})
			target.kick(reason);

			const kickEmbed = new MessageEmbed()
				.setTitle(`Le membre ${target} viens d'être kick !`)
				.setColor('ORANGE')
				.addFields([
					{ name: `Membre banni`, value: `\`${target.user.tag}\` (\`${target.id}\`)` },
					{ name: `Expulsé par`, value: `\`${interaction.user.tag}\` (\`${interaction.user.id}\`)` },
					{ name: `Raison`, value: `\`${reason}\`` }
				]
			);
			interaction.reply({ embeds: [kickEmbed], ephemeral: true })
		} catch {
			target.kick(reason);
			const kickEmbed = new MessageEmbed()
				.setTitle(`Le membre ${target} viens d'être kick !`)
				.setColor('ORANGE')
				.addFields([
					{ name: `Membre banni`, value: `\`${target.user.tag}\` (\`${target.id}\`)` },
					{ name: `Expulsé par`, value: `\`${interaction.user.tag}\` (\`${interaction.user.id}\`)` },
					{ name: `Raison`, value: `\`${reason}\`` }
				]
			);
			interaction.reply({ embeds: [kickEmbed], ephemeral: true })
		}
		
	}
};
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Permet de bannir un utilisateur du serveur',
    permissions: ['BAN_MEMBERS'],
	ownerOnly: false,
	usage: 'ban [@utilisateur] [raison]',
	examples: ['ban @exemple Raid', 'ban @exemple spamm' , 'ban @exmple Pub'],
	category: 'modération',
	async run (client, message, args) {
		if (!args[0]) return message.reply('Veuillez spécifier un membre à bannir');
		if (!args[1]) return message.rply('Veuillez spécifier la raison de ban du membre');

		const target = message.mentions.members.find(m => m.id)
		if(!target) return message.reply('Le membre que vous tenter de bannir est introuvable !');
		const reason = args.slice(1).join(' ');

		if (!target.bannable) return message.reply('Ce membre ne peut pas être banni par le bot. Vous devriez augmenter les permissions du bot sur le serveur pour qu\'il puisse bannir l\'utilisateur !')
		

		const banMemberEmbed = new MessageEmbed()
			.setTitle(`Vous avez été banni(e) !`)
			.setColor('DARK_RED')
			.setDescription(`Vous vennez d'être banni(e) du serveur \`${message.guild.name}\` (\`${message.guild.id}\`) pour la raison suivante => \`\`\`${reason}\`\`\``)
		;
		await target.send({embeds: [banMemberEmbed]})
		target.ban({ reason });

		const banEmbed = new MessageEmbed()
			.setTitle(`Le membre ${target} viens d'être banni !`)
			.setColor('ORANGE')
			.addFields([
				{ name: `Membre banni`, value: `\`${target.user.tag}\` (\`${target.id}\`)` },
				{ name: `Banni par`, value: `\`${message.author.tag}\` (\`${message.author.id}\`)` },
				{ name: `Raison`, value: `\`${reason}\`` }
			]
		);
		message.channel.send({ embeds: [banEmbed] })
	},
	options: [
		{
			name: 'membre',
			description: 'Membre à bannir du serveur',
			type: 'USER',
			required: true,
		},
		{
			name: 'raison',
			description: 'Raison de ban du serveur',
			type: 'STRING',
			required: true,
		},
		
	],
	async runInteraction (client, interaction) {

		const target = interaction.options.getMember('membre');
		const reason = interaction.options.getString('raison');

		if (!target.bannable) return interaction.reply('Ce membre ne peut pas être banni par le bot. Vous devriez augmenter les permissions du bot sur le serveur pour qu\'il puisse bannir l\'utilisateur !')
		

		try {
			const banMemberEmbed = new MessageEmbed()
				.setTitle(`Vous avez été banni(e) !`)
				.setColor('DARK_RED')
				.setDescription(`Vous vennez d'être banni(e) du serveur \`${interaction.guild.name}\` (\`${interaction.guild.id}\`) pour la raison suivante => \`\`\`${reason}\`\`\``)
			;
			await target.send({embeds: [banMemberEmbed]})
			target.ban({ reason });

			const banEmbed = new MessageEmbed()
				.setTitle(`Le membre ${target} viens d'être banni !`)
				.setColor('ORANGE')
				.addFields([
					{ name: `Membre banni`, value: `\`${target.user.tag}\` (\`${target.id}\`)` },
					{ name: `Banni par`, value: `\`${interaction.user.tag}\` (\`${interaction.user.id}\`)` },
					{ name: `Raison`, value: `\`${reason}\`` }
				]
			);
			interaction.reply({ embeds: [banEmbed], ephemeral: true })
		} catch {
			target.ban({ reason });
			const banEmbed = new MessageEmbed()
				.setTitle(`Le membre ${target} viens d'être banni !`)
				.setColor('ORANGE')
				.addFields([
					{ name: `Membre banni`, value: `\`${target.tag}\` (\`${target.id}\`)` },
					{ name: `Banni par`, value: `\`${interaction.user.tag}\` (\`${interaction.user.id}\`)` },
					{ name: `Raison`, value: `\`${reason}\`` }
				]
			);
			interaction.reply({ embeds: [banEmbed], ephemeral: true })
		}
		
	}
};
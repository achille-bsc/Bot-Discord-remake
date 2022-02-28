const { MessageEmbed, Message } = require('discord.js');
const  { readdirSync } = require('fs')
const commandFolder = readdirSync('./commands');
const prefix = '!'

const contextDescription = {
	userinfo: 'Renvoit des informations sur l\'utilisateur'
}

module.exports = {
	name: 'help',
	description: 'Renvoit l\'enssemble des commandes du bot',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'help <commande>',
	examples: ['help', 'help ping', 'help emit'],
	category: 'utile',
	async run (client, message, args) {
		if (!args.length) {
			const noArgsEmbed = new MessageEmbed()
				.setColor('#4ed5f8')
				.addField('Liste des commandes', `Une liste de toutes les catégories et leurs commandes.\nPour plus d'informations sur une commande, tappez \`${prefix}help <commande>\``)
			;

			for (const category of commandFolder) {
				noArgsEmbed.addField(
					`${category.toUpperCase()}`,
					`\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join('\`, \`')}\``
				);
			}
			return message.channel.send({ embeds: [noArgsEmbed] });
		}

		const cmd = client.commands.get(args[0]);
		if(!cmd) return message.reply(`Cette commande n'esxiste pas !`);


		const argsEmbed = new MessageEmbed()
			.setTitle(`[Help: Commande --> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les Administrateurs du bot uniquement /!\\' : ''}`)
			.addFields([
				{ name: 'Utilisation', value: `${prefix}${cmd.usage}` },
				{ name: 'Exemples', value: `${prefix}${cmd.examples.join(` | ${prefix}`)}` },
				{ name: 'Permission', value: `\`${cmd.permissions.join('\`, \`')}\`` },
				{ name: 'Autres', value: `${prefix} = prefix utilisé pour le bot ( "/commands" sont aussi disponnibles )
				{} = sous-commande(s) disponnible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnel(s)
				Ne pas inclure ces caractère -> {}, [] et <> dans vos commandes.` }
			])
			.setTimestamp()
			.setFooter({ text: 'Menu de HELP' })
		;
		message.channel.send({ embeds: [argsEmbed] })
	},
	options: [
		{
			name: 'commande',
			description: 'Tappez le nom de la commande',
			type: 'STRING',
			required: false,
		},
	],
	async runInteraction (client, interaction) {
		const cmdName = interaction.options.getString('commande');

		if (!cmdName) {
			const noArgsEmbed = new MessageEmbed()
				.setColor('#4ed5f8')
				.setColor('#4ed5f8')
				.addField('Liste des commandes', `Une liste de toutes les catégories et leurs commandes.\nPour plus d'informations sur une commande, tappez \`${prefix}help <commande>\``)
			;

			for (const category of commandFolder) {
				noArgsEmbed.addField(
					`${category.toUpperCase()}`,
					`\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join('\`, \`')}\``
				);
			}
			return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
		}

		const cmd = client.commands.get(cmdName);
		if(!cmd) return interaction.reply({ content: `Cette commande n'esxiste pas !`, ephemeral: true});

		const argsEmbed = new MessageEmbed()
		.setColor('#4ed5f8')
			.setTitle(`[Help: Commande --> ${cmd.name}] ${cmd.ownerOnly ? '/!\\ Pour les Administrateurs du bot uniquement /!\\' : ''}`)
			.addFields([
				{ name: 'Utilisation', value: `${prefix}${cmd.usage}` },
				{ name: 'Exemples', value: `${prefix}${cmd.examples.join(` | ${prefix}`)}` },
				{ name: 'Permission', value: `\`${cmd.permissions.join('\`, \`')}\`` },
				{ name: 'Autres', value: `${prefix} = prefix utilisé pour le bot ( "/commands" sont aussi disponnibles )
				{} = sous-commande(s) disponnible(s) | [] = option(s) obligatoire(s) | <> = option(s) optionnel(s)
				Ne pas inclure ces caractère -> {}, [] et <> dans vos commandes.` }
			])
			.setTimestamp()
			.setFooter({ text: 'Menu de HELP' })
		;
		interaction.reply({ embeds: [argsEmbed], ephemeral: true })
	}
};
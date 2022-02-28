const { MessageEmbed } = require('discord.js')
const package = require('../../package.json')

module.exports = {
	name: 'botinfo',
	description: 'Donne des informations relatives au bot',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'botinfos',
	examples: ['botinfo'],
	category: 'utile',
	async run (client, message, args) {
		let guilds = 0
		let members = 0
		client.guilds.cache.map(g => {
			guilds = guilds + 1
		})
		client.guilds.members.cache.map(m => {
			members = members + 1
		})
		
		const embed = new MessageEmbed()
			.setTitle('Informations')
			.setDescription('Voici quelques informations me concernant :')
			.addFields([
				{
					name: 'Version', value: `${package.version}`, inline: true
				},
				{
					name: 'Serveurs', value: `${guilds}`, inline: true
				},
				{
					name: 'Utilisateurs', value: `${members}`, inline: true
				},
				{
					name: 'Site Web', value: `[Site web](https://www.google.com)`, inline: true
				},
			])
		;
		message.reply({embed: [embed]})

	},
	async runInteraction (client, interaction) {
		
		let guilds = 0
		let members = 0
		client.guilds.cache.map(g => {
			guilds = guilds + 1
			members = members + g.memberCount
		})
		
		const embed = new MessageEmbed()
			.setTitle('Informations')
			.setDescription('Voici quelques informations me concernant :')
			.addFields([
				{
					name: 'Version', value: `${package.version}`, inline: true
				},
				{
					name: 'Serveurs', value: `${guilds}`, inline: true
				},
				{
					name: 'Utilisateurs', value: `${members}`, inline: true
				},
				{
					name: 'Shards', value: `1/1\n( Prévu aux 75 serveurs )`, inline: true
				},
				{
					name: 'Site Web', value: `[Site web](https://frenchsimu.github.io/Code-Industry-website/)`, inline: true
				},
				{
					name: 'Ajoute Moi', value: `[\[Invitation\]](https://discord.com/api/oauth2/authorize?client_id=902293972091801620&permissions=8&scope=bot%20applications.commands )`, inline: true
				},
				{
					name: 'Support', value: `[\[Invitation\]](http://www.discord.gg/tCmb8yGZYw)`, inline: true
				},
				{
					name: 'Développeur', value: `Achille - Dev`, inline: true
				}
			])
			.setTimestamp()
			.setFooter({
				text: 'Achille - Dev', iconURL: `${client.user.displayAvatarURL()}`
			})
		;
		interaction.reply({embeds: [embed], ephemeral: true})

	}
};
const { MessageEmbed, Permissions } = require('discord.js');
const { required } = require('nodemon/lib/config');
const guildMemberAdd = require('../../events/guild_members/guildMemberAdd');

module.exports = {
	name: 'dbConfig',
	description: 'Emettre un évènement au choix',
    permissions: ['ADMINISTRATOR'],
	ownerOnly: true,
	usage: 'dbConfig',
	examples: ['dbConfig [key] <value>'],
	category: 'administrateur',
	async run (client, message, args, guildSettings) {
		if (!args[0] || !args[0].toLowerCase().match(/^(prefix|logchannel)$/)) return message.reply({ content: `Merci d'entrer un évènement valide (\`prefix\`, \`logchannel\`)` });

		if (args[0].loLowerCase() == 'prefix') {
			if(value) {
				await client.updateGuild(interaction.guild, {prefix: value});
				return await message.reply({  content: `Le préfix est désormais \`${guildSettings.prefix}\`` });
			}
			message.reply( 'Evenement guildMemberAdd émit !' )
		} else if (args[0].toLowerCase() == 'logchannel') {
			if(value) {
				await client.updateGuild(interaction.guild, {logChannel: value});
				return await message.reply({  content: `Le salon de logs est maintenent: <#${guildSettings.prefix}>` });
			}
			message.reply( 'Evenement guildCreate émit !' )
		}
	},
	options: [
		{
			name: 'key',
			description: 'Choisir une valeur à modifier ou à visualiser',
			type: 'STRING',
			required: true,
			choices: [
				{
					name: 'prefix',
					value: 'prefix'
				},
				{
					name: 'logsChannel',
					value: 'logsChannel'
				},
			],
		},
		{
			name: 'value',
			description: 'Choisir la nouvelle valeur pour votre cléf',
			type: 'STRING',
		}
	],
	async runInteraction (client, interaction, guildSettings) {
		const key = interaction.options.getString('key');
		const value = interaction.options.getString('value');

		if (key == 'prefix') {
			
			if(value) {
				await client.updateGuild(interaction.guild, {prefix: value});
				return await interaction.reply({  content: `Le préfix est désormais \`${guildSettings.prefix}\`` });
			}

			interaction.reply({ content: `valeur de prefix ${guildSettings.prefix}` })
		} else if (key == 'logChannel') {

			if(value) {
				await client.updateGuild(interaction.guild, {logChannel: value});
				return await interaction.reply({  content: `Le salon de logs est maintenent: <#${guildSettings.prefix}>` });
			}

			interaction.reply( `Voici le salon le logs: <#${guildSettings.logChannel}>` )
		}
	}
};
const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
	name: 'clear',
	description: 'Permet de supprimer entre 1 et 99 messages inclus',
    permissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
	ownerOnly: false,
	usage: 'clear [nombre]',
	examples: ['clear 1', 'clear 99', 'clear 5'],
	category: 'conversation',
	async run (client, message, args) {
		return;
	},
	options: [
		{
			name: 'nombre',
			description: 'Nombre de messages à supprimer',
			type: 'INTEGER',
			required: true,
		}
	],
	async runInteraction (client, interaction) {
		const nbr = interaction.options.getInteger('nombre');

		if (!nbr < 99 && !nbr > 0) return interaction.reply({ content: 'Vous devez indiquer un nombre inférieur ou et égale à 99 et suppérieur ou égal à 1', ephemeral: true})

		interaction.channel.bulkDelete(nbr, true)
		interaction.reply({content: `\`${nbr}\` messages ont été supprimés avec succès ! ✅`, ephemeral: true})
	}
};
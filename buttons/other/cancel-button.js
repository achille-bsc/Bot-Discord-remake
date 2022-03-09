const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'cancel-button',
	async runInteraction (client, interaction) {
		interaction.message.delete().catch(e => {return})
		interaction.reply({ content: 'Commande annulée ! ✅', ephemeral: true })
	}
};
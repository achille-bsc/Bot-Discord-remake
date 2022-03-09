const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const buttons = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('primary-button')
			.setLabel('Primary')
			.setStyle('PRIMARY')
		,
		new MessageButton()
			.setCustomId('secondary-button')
			.setLabel('Secondary')
			.setStyle('SECONDARY')
		,
		new MessageButton()
			.setCustomId('success-button')
			.setLabel('Success')
			.setStyle('SUCCESS')
		,
		new MessageButton()
			.setCustomId('danger-button')
			.setLabel('Danger')
			.setStyle('DANGER')
		,
		new MessageButton()
		.setURL('https://www.google.com')
			.setLabel('Link')
			.setStyle('LINK')
		,
	)

module.exports = {
	name: 'foo',
	description: 'Permet de tester le buttons handler',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'foo',
	examples: ['foo'],
	category: 'utile',
	async run (client, message, args) {
	},
	async runInteraction (client, interaction) {
		await interaction.reply({ content: 'Vous pouvez cliquer sur des bouttons', components: [buttons] })
	}
};

async function waiting(time = 5000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
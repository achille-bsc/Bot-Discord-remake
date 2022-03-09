const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')

const buttons = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId('roles-menu')
			.setPlaceholder('Choisir un rôle dans la liste')
			.setMinValues(1)
			.setMaxValues(3)
			.addOptions([
				{
					label: 'Vert',
					description: 'Choisir la couleur verte',
					value: '949821310484250664'
				},
				{
					label: 'Rouge',
					description: 'Choisir la couleur rouge',
					value: '949821210240385084'
				},
				{
					label: 'Orange',
					description: 'Choisir la couleur orange',
					value: '949821361889624125'
				}
			])
		,
	)
;

module.exports = {
	name: 'roles',
	description: 'Permet de choisir un ou plusieurs rôles',
	permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'roles',
	examples: ['roles'],
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
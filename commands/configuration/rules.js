const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
	name: 'rules',
	description: 'Permet de faire un un message pour accépter le règlement',
	permissions: ['ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'rules [@role]',
	examples: ['rules @membre'],
	category: 'configuration',
	async run (client, message, args) {
		
	},
	options: [
		{
			name: 'role',
			description: 'Rôle à attribuer au boutton',
			type: 'ROLE',
			required: true,
		},		
	],
	async runInteraction (client, interaction) {
		const role = interaction.options.getRole('role')
		if (!role) return interaction.reply({ content: `Une erreur s'est produite ! veuillez réessayer !`, ephemeral: true })
		const embed = new MessageEmbed()
			.setTitle(`Valider le règlement`)
			.setDescription(`Afin de valider le règlement, veuillez apuyer sur le boutton ci-dessous !`)
			.setTimestamp()
		;
		const button = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`roleadd-${role.id}`)
					.setLabel(`Valider le règlement`)
					.setStyle('SUCCESS')
				,
			)
		;

		interaction.channel.send({ components: [button], embeds: [embed] });
		interaction.reply({ ephemeral: true, content: `Le règlement à bien été mis en place !` })
	}
};

async function waiting(time = 5000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
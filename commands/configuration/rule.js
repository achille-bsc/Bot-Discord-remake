const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'rule',
	description: 'Permet de créer un message de validation du règlement.',
    permissions: ['ADMINISTRATOR'],
	ownerOnly: false,
	usage: 'rule [role] <salon>',
	examples: ['rule @membre', 'rule @membre #règlement'],
	category: 'conversation',
	async run (client, message, args) {

		
	},
	options: [
		{
			name: 'role',
			description: 'Rôle à ajouter lors de la validation du règlement.',
			type: 'ROLE',
			required: true,
        },
        
        {
			name: 'salon',
			description: 'Salon où sera affiché le message de validation du règlement.',
			type: 'CHANNEL',
			required: false,
		},
		
	],
	async runInteraction (client, interaction) {
		
        const embed = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Accepter le règlement')
            .setDescription(`Afin d'accepter le règlement, merci de cliquer sur le bouton ci-dessous.`)
            .setTimestamp()
        ;
        
        // create a discord.js button
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`rule-${role.id}`)
					.setLabel('Accepter le règlement')
                    .setStyle('SUCCESS')
                ,
            )
        ;
        
        


        const role = interaction.options.role;
        const channel = await interaction.options.channel || interaction.channel;
        channel.send({ embeds: [embed], components: [row] })

	}
};
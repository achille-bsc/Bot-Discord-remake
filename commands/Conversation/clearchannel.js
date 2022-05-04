const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'clearchannel',
	description: 'Permet de réinitialiser un salon à son état d\'origine.',
    permissions: ['MANAGE_CHANNELS'],
	ownerOnly: false,
	usage: 'clearchannel',
	examples: ['clearchannel'],
	category: 'conversation',
	async run (client, message, args) {

		
		
	},
	options: [],
    async runInteraction(client, interaction) {
        const embed = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Réinitialisation du salon')
            .setDescription('Le salon est en cour de réinitialisation, veuillez patienter...')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })
        ;
        interaction.reply({ embeds: [embed] });
        const channel = await interaction.channel.clone();
        await interaction.channel.delete();
        const success = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Réinitialisation du salon')
            .setDescription('Le salon a été réinitialisé avec succès !')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })
        ;
        channel.send({ embeds: [success] })
	}
};
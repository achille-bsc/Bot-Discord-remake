const { MessageEmbed, Message, MessageActionRow, MessageButton } = require('discord.js');
const { ping } = require('tmi.js/lib/commands');

module.exports = {
	name: 'ping',
	description: 'Donne la lantence du bot ainsi que quelques informations détaillés part rapport à son hébergement',
    permissions: ['SEND_MESSAGES'],
	ownerOnly: false,
	usage: 'ping',
	examples: ['ping'],
	category: 'informations',
	async run (client, message, args) {

        const pingEmbed = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Latence du bot')
            .setDescription('Voici les informations sur la latence du bot ainsi que sur son hébergement.')
            .addFields(
                { name: 'Latence BOT', value: `\`Calcule en cours...\``, inline: true },
                { name: 'Latence API', value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
                { name: 'Total', value: `\`Calcul en cours...\``, inline: true },
                { name: 'RAM utilisable', value: `\`512 MG\``, inline: true },
                { name: 'Espace disque utilisable', value: `\`1GB\``, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${message.author.tag}`, avatarURL: `${message.author.displayAvatarURL()}`});
        ;
        const messagePing = await message.reply({ embeds: [pingEmbed] });

        await wait(1)
        
        const botPing = messagePing.createdTimestamp - message.createdTimestamp
        const pingEmbedEdited = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Latence du bot')
            .setDescription('Voici les informations sur la latence du bot ainsi que sur son hébergement.')
            .addFields(
                { name: 'Latence BOT', value: `\`${botPing}\`ms`, inline: true },
                { name: 'Latence API', value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
                { name: 'Total', value: `\`${botPing + Math.round(client.ws.ping)}\``, inline: true },
                { name: 'RAM utilisable', value: `\`512 MG\``, inline: true },
                { name: 'Espace disque utilisable', value: `\`1GB\``, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${message.author.tag}`, avatarURL: `${message.author.displayAvatarURL()}`});
        ;

        messagePing.edit({ embeds: [pingEmbedEdited]})
		
	},
    options: [],
    
	async runInteraction (client, interaction) {
		
        const pingEmbed = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Latence du bot')
            .setDescription('Voici les informations sur la latence du bot ainsi que sur son hébergement.')
            .addFields(
                { name: 'Latence BOT', value: `\`Calcul en cours...\``, inline: true },
                { name: 'Latence API', value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
                { name: 'Total', value: `\`Calcul en cours...\``, inline: true },
                { name: 'RAM utilisable', value: `\`512\`MG`, inline: true },
                { name: 'Espace disque utilisable', value: `\`1\`GB`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL()}`});
        ;
        const messagePing = await interaction.reply({ embeds: [pingEmbed], ephemeral: false, fetchReply: true });

        await wait(1)
        
        const botPing = messagePing.createdTimestamp - interaction.createdTimestamp
        const pingEmbedEdited = new MessageEmbed()
            .setColor('#4ED5F8')
            .setTitle('Latence du bot')
            .setDescription('Voici les informations sur la latence du bot ainsi que sur son hébergement.')
            .addFields(
                { name: 'Latence BOT', value: `\`${botPing}\`ms`, inline: true },
                { name: 'Latence API', value: `\`${Math.round(client.ws.ping)}\`ms`, inline: true },
                { name: 'Total', value: `\`${botPing + Math.round(client.ws.ping)}\`ms`, inline: true },
                { name: 'RAM utilisable', value: `\`512\`MG`, inline: true },
                { name: 'Espace disque utilisable', value: `\`1\`GB`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.member.tag}`, avatarURL: `${interaction.member.displayAvatarURL()}`});
        ;

        interaction.editReply({ embeds: [pingEmbedEdited], ephemeral: false })
	}
};


function wait(waitsecs = 5) {
    return new Promise(resolve => setTimeout(resolve, waitsecs * 1000));
}
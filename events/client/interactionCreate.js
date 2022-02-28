const { Permissions } = require('discord.js')
const ownerid = '688098375697956905';

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(client, interaction) {
		if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);

            if (!cmd) return interaction.reply('Cette commande n\'existe pas !');

			if(cmd.ownerOnly) {
				if(interaction.user.id != ownerid) return interaction.reply('Seuls les Administrateurs du bot peuvent utiliser cette commande')
			}

			if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour tapper cette commande`, ephemeral: true });

            cmd.runInteraction(client, interaction);
        }
	},
};
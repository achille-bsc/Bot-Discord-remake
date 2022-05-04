const { MessageEmbed } = require('discord.js')

const ownerid = '688098375697956905'

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute (client, interaction) {
    if (interaction.isCommand() || interaction.isContextMenu() || interaction.isButton()) {
      if (interaction.customId === `${interaction.member.id}-forfate`) {
        const embed = new MessageEmbed()
          .setTitle('Fin de la partie !')
          .setDescription('Vous venez de déclarer forfait !')
          .addField('Victoir', 'Code Industry')
          .setColor('AQUA')
        return interaction.message.edit({ embeds: [embed], components: [] })
      }
      // let guildSettings = client.getGuild(interaction.guild)

      // if(!guildSettings) {
      // await client.createGuild(interaction.guild);
      // guildSettings = await client.getGuild(interaction.guild);
      // }

      const cmd = client.commands.get(interaction.commandName)

      if (!cmd) return interaction.reply('Cette commande n\'existe pas !')

      if (cmd.ownerOnly) {
        if (interaction.user.id !== ownerid) return interaction.reply('Seuls les Administrateurs du bot peuvent utiliser cette commande')
      }

      if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour tapper cette commande`, ephemeral: true })

      cmd.runInteraction(client, interaction)
    } else if (interaction.isButton()) {
      if (interaction.customId.startsWith('roleadd-')) { '../../buttons/other/addrole-button.js'.runInteraction(client, interaction) }
      const btn = client.buttons.get(interaction.customId)

      if (!btn) return
      btn.runInteraction(client, interaction)
    } else if (interaction.isSelectMenu()) {
      const selectMenu = client.selects.get(interaction.customId)

      if (!selectMenu) return interaction.reply('Ce Menu n\'existe pas !')
      selectMenu.runInteraction(client, interaction)
    }
  }
}

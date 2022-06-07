const { Modal, TextInputComponent, MessageActionRow } = require('discord.js')

module.exports = {
  name: 'refuse',
  async runInteraction (client, interaction) {
    const member = client.users.cache.get(`${interaction.customId.split('-')[1]}`)
    if (!member) {
      return interaction.reply({ content: 'Le membre est introuvable ! Il n\'a donc pas pu être prévenu de son rejet.' })
    }
    const modal = new Modal()
      .setCustomId(`refuse-${member.id}`)
      .setTitle('Formulaire de renvoit')

    const reason = new TextInputComponent()
      .setCustomId('raison')
      .setLabel(`Raison de renvoit de ${interaction.user.tag}`)
      .setStyle('PARAGRAPH')

    const firstActionRow = new MessageActionRow().addComponents(reason)

    await modal.addComponents(firstActionRow)

    interaction.showModal(modal)
    interaction.message.delete()
  }
}

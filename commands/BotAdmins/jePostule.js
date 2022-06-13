const { Modal, MessageActionRow, TextInputComponent } = require('discord.js')

module.exports = {
  name: 'jepostule',
  description: 'Permet de postuler pour coder le projet en ma compagnie',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'jepostule',
  examples: ['setpremium'],
  category: 'botadmin',

  async runInteraction (client, interaction) {
    const modal = new Modal()
      .setCustomId(`jepostuleForm-${interaction.user.id}`)
      .setTitle('Formulaire de recrutement')

    const name = new TextInputComponent()
      .setCustomId('names')
      .setLabel('Quel est votre NOM & Prénom IRL ?')
      .setStyle('SHORT')
      .setMinLength(7)
      .setMaxLength(1024)

    const age = new TextInputComponent()
      .setCustomId('age')
      .setLabel('Quel est votre âge ?')
      .setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(6)

    const langs = new TextInputComponent()
      .setCustomId('langues')
      .setLabel('Quelles langues parlez-vous ?')
      .setStyle('SHORT')
      .setMinLength(2)
      .setMaxLength(1024)

    const presentation = new TextInputComponent()
      .setCustomId('presentation')
      .setLabel('Présentez-vous & donnez vos motivations')
      .setStyle('PARAGRAPH')
      .setMinLength(225)
      .setMaxLength(1024)

    const exp = new TextInputComponent()
      .setCustomId('exp')
      .setLabel('Vos expérences (repository + explication)')
      .setStyle('PARAGRAPH')
      .setMinLength(100)
      .setMaxLength(1024)

    const firstActionRow = new MessageActionRow().addComponents(name)
    const secondActionRow = new MessageActionRow().addComponents(age)
    const thirdActionRow = new MessageActionRow().addComponents(langs)
    const fourthActionRow = new MessageActionRow().addComponents(presentation)
    const fivthActionRow = new MessageActionRow().addComponents(exp)

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fivthActionRow)

    await interaction.showModal(modal)
  }

}

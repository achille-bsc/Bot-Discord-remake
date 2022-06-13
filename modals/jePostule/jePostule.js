const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
  name: 'jepostuleForm',
  async runInteraction (client, interaction) {
    const names = interaction.fields.getTextInputValue('names')
    const age = interaction.fields.getTextInputValue('age')
    const langues = interaction.fields.getTextInputValue('langues')
    const presentation = interaction.fields.getTextInputValue('presentation')
    const exp = interaction.fields.getTextInputValue('exp')

    const embed = new MessageEmbed()
      .setTitle('Nouvelle candidature')
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setColor('BLURPLE')
      .addField('names', `${names}`)
      .addField('age', `${age}`)
      .addField('langues', `${langues}`)
      .addField('presentation', `${presentation}`)
      .addField('exp', `${exp}`)

    const button = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`refuse-${interaction.customId.split('-')[1]}`)
          .setLabel('Refuser')
          .setStyle('DANGER')
      )

    const guild = client.guilds.cache.get('848598227301040159')
    guild.channels.cache.get('973151832241217576').send({ embeds: [embed], components: [button] })

    interaction.reply({ content: 'Le formulaire à correctement été envoyé ! Vous recevrez une réponse lorsque votre candidature aura été éxaminée !', ephemeral: true })
  }
}

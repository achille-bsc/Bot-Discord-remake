const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'refuse',
  async runInteraction (client, interaction) {
    interaction.deferReply()
    interaction.deleteReply()
    const member = client.users.cache.get(`${interaction.customId.split('-')[1]}`)

    const embed = new MessageEmbed()
      .setTitle('Refus')
      .setColor('RED')
      .setDescription(`Je suis au regrêt de vous annoncer que votre candidature pour devenir developpeur sur le bot Ymule - Bot viens d'être rejetée pour la raison suivante: \`\`\`${interaction.fields.getTextInputValue('raison')}\`\`\``)
    member.send({ embeds: [embed] })
  }
}

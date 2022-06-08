module.exports = {
  name: 'refuse',
  async runInteraction (client, interaction) {
    const member = client.users.cache.get(`${interaction.customId.split('-')[1]}`)

    member.send({ content: `Je suis au regrêt de vous annoncer que votre candidature pour devenir developpeur sur le bot Ymule - Bot viens d'être rejetée pour la raison suivante: \`\`\`${interaction.fields.getTextInputValue('raison')}\`\`\`` })
  }
}

module.exports = {
  name: 'close-ticket',
  async runInteraction (client, interaction) {
    interaction.channel.delete()
  }
}

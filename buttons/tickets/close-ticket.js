module.exports = {
  name: 'closeTicket',
  async runInteraction (client, interaction) {
    interaction.channel.delete()
  }
}

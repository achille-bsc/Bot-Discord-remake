const langFr = require('../../languages/fr/Conversation/clear.json')
const langEn = require('../../languages/en/Conversation/clear.json')

module.exports = {
  name: 'clear',
  description: 'Supprime entre 1 à 100 messages dans une conversation ou pour un utilisateur seulement',
  permissions: ['MANAGE_MESSAGES'],
  ownerOnly: false,
  usage: 'clear [nombre] <@utilisateur> <#salon>',
  examples: ['clear 99', 'clear 7 #général', 'clear 5 @exemple#0000', 'clear 25 @éxemple#0000 #général'],
  category: 'conversation',
  options: [
    {
      name: 'messages',
      description: 'Nombre de messages à supprimer',
      type: 'NUMBER',
      required: true
    },
    {
      name: 'user',
      description: 'Membre dont vous voullez supprimer les messages',
      type: 'USER',
      required: false
    },
    {
      name: 'channel',
      description: 'Salon dans le quelle vous souhaitez supprimer les messages',
      type: 'CHANNEL',
      required: false
    }

  ],
  async runInteraction (client, interaction) {
    const guild = await client.getGuild(interaction.guild)
    const lang = guild.langue === 'fr' ? langFr : langEn

    const amountToDelete = parseInt(interaction.options.getNumber('messages'))
    if (amountToDelete > 100 || amountToDelete < 1) return interaction.reply({ content: lang.amountOutOfPatern, ephemeral: true })
    const target = interaction.options.getMember('user')
    let channelToDelete = interaction.options.getChannel('channel')
    if (!channelToDelete) { channelToDelete = interaction.channel }

    const messagesToDelete = await interaction.channel.messages.fetch()

    if (target) {
      let i = 0
      const filteredTargetMessages = [];
      (await messagesToDelete).filter(async msg => {
        if (msg.author.id === target.id && amountToDelete > i) {
          filteredTargetMessages.push(msg); i++
        }
      })

      await channelToDelete.bulkDelete(filteredTargetMessages, true).then(messages => {
        interaction.reply({ content: `${lang.targetDeleted1} ${messages.size} ${messages.size > 1 ? 'messages' : 'message'} ${lang.targetDeleted2} ${target} ${lang.targetDeleted3} <#${channelToDelete.id}>`, ephemeral: true })
      })
    } else {
      await channelToDelete.bulkDelete(amountToDelete, true).then(messages => {
        interaction.reply({ content: `${lang.targetDeleted1} ${messages.size} ${messages.size > 1 ? 'messages' : 'message'} ${lang.targetDeleted3} <#${channelToDelete.id}>`, ephemeral: true })
      })
    }
  }
}

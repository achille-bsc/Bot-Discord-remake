const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
  name: 'setpremium',
  description: 'Ajoute un serveur premium',
  permissions: ['ADMINISTRATOR'],
  ownerOnly: true,
  usage: 'setpremium <guildId>',
  examples: ['setpremium 123456789123456789'],
  category: 'botadmin',
  async run (client, message, args) {
    if (config.botadmins.includes(message.author.id)) {
      const guild = client.guilds.cache.get(args[0])
      const guildDb = await client.getGuild(guild)
      if (guildDb) {
        guildDb.premium = true
        guildDb.endPremiumTimestamp = Date.now() + (1000 * 60 * 60 * 24 * 30)
        guildDb.save().then(() => {
          message.channel.send(`Le serveur **${guild.name}** est maintenant premium !`)
        })
      }
    }
  },

  options: [
    {
      name: 'guildid',
      description: 'ID de la guild à passer premium',
      type: 'STRING',
      required: true
    },
    {
      name: 'switch',
      description: 'toggle',
      type: 'BOOLEAN',
      required: true
    },
    {
      name: 'offre',
      description: 'Offre choisi par le/la client(e)',
      type: 'STRING',
      required: true,
      choices: [
        { name: 'week', value: 'week' },
        { name: 'month', value: 'month' },
        { name: 'sixMonths', value: 'sixmonths' },
        { name: 'year', value: 'year' }
      ]
    }
  ],

  async runInteraction (client, interaction) {
    if (!config.botadmins.includes(interaction.member.id)) return interaction.reply({ content: 'Cette commande n\'est disponnible que aux administrateurs du bot', ephemeral: true })

    const guildId = interaction.options.getString('guildid')
    const offer = interaction.options.getString('offre')
    const time = offer === 'week' ? 1000 * 60 * 60 * 24 * 7 : offer === 'month' ? 1000 * 60 * 60 * 24 * 28 : offer === 'sixmonths' ? 1000 * 60 * 60 * 24 * 30 * 6 : 1000 * 60 * 60 * 24 * 30 * 12
    let toggle = interaction.options.getBoolean('switch')
    if (toggle === 'true') {
      toggle = true
    } else if (toggle === 'false') {
      toggle = false
    }
    const guild = client.guilds.cache.get(guildId)
    const guildDb = await client.getGuild(guild)
    console.log(guildDb)
    if (guildDb) {
      guildDb.premium = toggle
      guildDb.endPremiumTimestamp = Date.now() + time
      guildDb.activated = false
      guildDb.save().then(() => {
        interaction.reply({ content: `Le serveur **${guild.name}** ${toggle ? 'est maintenant premium !' : 'n\'est maintenant plus premium !'}`, ephemeral: true })
      }).catch((err) => {
        const erreur = new MessageEmbed()
          .setTitle('Erreur')
          .setDescription(`Une erreur s'est produite. Le bot n'est pas parvenu à trouver le serveur que vous tentez de mettre premium. Il est possible que le bot ne soit pas sur le serveur en qustion. Voici l'erreur:\`\`\`${err}\`\`\``)

        interaction.reply({ embdes: erreur, ephemeral: true })
      })
    }
  }

}

// const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
// const { morpion3x3, morpion4x4 } = require('../../utils/handlers/MorpionUtil')

// module.exports = {
//   name: 'morpion',
//   description: 'Permet de jouer au morpion contre le bot',
//   permissions: ['VIEW_CHANNEL'],
//   ownerOnly: false,
//   usage: 'morpion',
//   examples: ['morpion'],
//   category: 'jeux',
//   async run (client, message, args) {
//     message.delete()
//     const embed = new MessageEmbed()
//       .setTitle('Morpion')
//       .setDescription('Sur quelle grille souhaitez-vous jouer ?')
//       .setColor('#0099ff')

//     const row = new MessageActionRow()
//       .addComponents(
//         new MessageButton()
//           .setCustomId('3')
//           .setLabel('3x3')
//           .setStyle('SUCCESS')

//       )
//       .addComponents(
//         new MessageButton()
//           .setCustomId('4')
//           .setLabel('4x4')
//           .setStyle('DANGER')

//       )

//     const reply = await message.channel.send({ embeds: [embed], components: [row] })

//     const filter = i => {
//       i.deferUpdate()
//       return i.user.id === message.author.id
//     }

//     reply.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
//       .then(async interaction => {
//         if (interaction.customId === '3') {
//           interaction.message.delete()
//           const embed = new MessageEmbed()
//             .setTitle('Morpion')
//             .setDescription('Quelle niveau souhaitez-vous ?')
//             .setColor('#0099ff')

//           const row = new MessageActionRow()
//             .addComponents(
//               new MessageButton()
//                 .setCustomId('1')
//                 .setLabel('Facile')
//                 .setStyle('SUCCESS')

//             )
//             .addComponents(
//               new MessageButton()
//                 .setCustomId('3')
//                 .setLabel('Difficile')
//                 .setStyle('DANGER')
//             )

//           const reply = await message.channel.send({ embeds: [embed], components: [row] })

//           const filter = i => {
//             i.deferUpdate()
//             return i.user.id === message.author.id
//           }

//           reply.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
//             .then(async interaction => {
//               const level = parseInt(interaction.customId)
//               let gmode = ''
//               if (level === 1) {
//                 gmode = 'Facile'
//               } else if (level === 3) {
//                 gmode = 'Difficile'
//               }
//               morpion3x3(message, level, gmode)
//             })
//         } else if (interaction.customId === '4') {
//           interaction.message.delete()
//           const embed = new MessageEmbed()
//             .setTitle('Morpion')
//             .setDescription('Quelle niveau souhaitez-vous ?')
//             .setColor('#0099ff')

//           const row = new MessageActionRow()
//             .addComponents(
//               new MessageButton()
//                 .setCustomId('1')
//                 .setLabel('Facile')
//                 .setStyle('SUCCESS')

//             )
//             .addComponents(
//               new MessageButton()
//                 .setCustomId('3')
//                 .setLabel('Difficile')
//                 .setStyle('DANGER')
//             )

//           const reply = await message.channel.send({ embeds: [embed], components: [row] })

//           const filter = i => {
//             i.deferUpdate()
//             return i.user.id === message.author.id
//           }

//           reply.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
//             .then(async interaction => {
//               const level = parseInt(interaction.customId)
//               let gmode = ''
//               if (level === 1) {
//                 gmode = 'Facile'
//               } else if (level === 3) {
//                 gmode = 'Difficile'
//               }

//               morpion4x4(message, level, gmode)
//             })
//         }
//       })
//       .catch(() => null)
//   }

// }

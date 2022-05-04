/* eslint-disable no-multiple-empty-lines */
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

function wait (waitsecs = 5000) {
  return new Promise(resolve => setTimeout(resolve, waitsecs))
}

module.exports = { morpion3x3, morpion4x4 }

let gridTrois = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8
]

let gridQuatre = [
  0, 1, 2, 3,
  4, 5, 6, 7,
  8, 9, 10, 11,
  12, 13, 14, 15
]
const scoreQuatre = [
  8, 4, 4, 8,
  4, 3, 3, 4,
  4, 3, 3, 4,
  8, 4, 4, 8
] // Fonctionne !

let AIMove3
let AIMove4
// win function 3x3
function winTrois () {
  // Tableau de toutes les possibilités de victoire
  const WinSituation = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2]
  ]

  for (let i = 0; i < WinSituation.length; i++) {
    const TestRow = WinSituation[i]
    const RowValues = []

    // vérifier la victoire
    for (let j = 0; j < TestRow.length; j++) {
      RowValues.push(gridTrois[TestRow[j]])
    }

    const CrossesWin = function (Value) {
      return Value === '❌'
    }

    const NoughtsWin = function (Value) {
      return Value === '⭕'
    }

    if (RowValues.every(CrossesWin)) {
      return 1
    } else if (RowValues.every(NoughtsWin)) {
      return -1
    }
  }
}

// const nextWinSituations = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [4, 5],
//   [5, 6],
//   [6, 7],
//   [8, 9],
//   [9, 10],
//   [10, 11],
//   [12, 13],
//   [13, 14],
//   [14, 15],
//   [0, 4],
//   [1, 5],
//   [2, 6],
//   [3, 7],
//   [4, 8],
//   [5, 9],
//   [6, 10],
//   [7, 11],
//   [8, 12],
//   [9, 13],
//   [10, 14],
//   [11, 15],
//   [0, 5],
//   [1, 6],
//   [2, 7],
//   [4, 9],
//   [5, 10],
//   [6, 11],
//   [8, 13],
//   [9, 14],
//   [10, 15],
//   [1, 4],
//   [2, 5],
//   [3, 6],
//   [5, 8],
//   [6, 9],
//   [7, 10],
//   [9, 12],
//   [10, 13],
//   [11, 14]
// ]

// win function 4x4
function winQuatre () {
  // Tableau de toutes les possibilités de victoire
  // Tableau de toutes les possibilités de victoire
  const WinSituation = [
    [0, 1, 2],
    [1, 2, 3],
    [4, 5, 6],
    [5, 6, 7],
    [8, 9, 10],
    [9, 10, 11],
    [12, 13, 14],
    [13, 14, 15],
    [0, 4, 8],
    [1, 5, 9],
    [2, 6, 10],
    [3, 7, 11],
    [4, 8, 12],
    [5, 9, 13],
    [6, 10, 14],
    [7, 11, 15],
    [0, 5, 10],
    [1, 6, 11],
    [4, 9, 14],
    [5, 10, 15],
    [2, 5, 8],
    [3, 6, 9],
    [6, 9, 12],
    [7, 10, 13]
  ]

  for (let i = 0; i < WinSituation.length; i++) {
    const TestRow = WinSituation[i]
    const RowValues = []

    // vérifier la victoire
    for (let j = 0; j < TestRow.length; j++) {
      RowValues.push(gridQuatre[TestRow[j]])
    }

    const CrossesWin = function (Value) {
      return Value === '❌'
    }

    const NoughtsWin = function (Value) {
      return Value === '⭕'
    }

    if (RowValues.every(CrossesWin)) {
      return 1
    } else if (RowValues.every(NoughtsWin)) {
      return -1
    }
  }
}

function minimaxTrois (newGrid, player, level) {
  let limit = 0
  const availables = newGrid.filter(function (a) {
    return typeof a === 'number'
  })

  if (winTrois(newGrid) === 1) {
    return 1
  } else if (winTrois(newGrid) === -1) {
    return -1
  } else if (availables.length === 0) {
    return 0
  }

  const moves = []
  const scores = []

  for (const available of availables) {
    const move = newGrid[available]
    newGrid[available] = player
    if (player === '❌' && limit < level) {
      limit = limit + 1
      scores.push(minimaxTrois(newGrid, '⭕', 4))
    } else if (player === '⭕' && limit < level) {
      limit = limit + 1
      scores.push(minimaxTrois(newGrid, '❌', 4))
    }
    newGrid[available] = move
    moves.push(move)
  }

  if (player === '❌') {
    const HighScore = Math.max(...scores)
    const HighScoreIndex = scores.indexOf(HighScore)
    AIMove3 = moves[HighScoreIndex]
    return scores[HighScoreIndex]
  } else {
    const LowScore = Math.min(...scores)
    const LowScoreIndex = scores.indexOf(LowScore)
    AIMove3 = moves[LowScoreIndex]
    return scores[LowScoreIndex]
  }
}


async function minimaxQuatre (newGrid, player, step) {
  const winner = winQuatre()
  if (winner) {
    return winner - 1000
  }

  const availables = newGrid.filter(function (a) {
    return typeof a === 'number'
  })

  const scoresList = []
  const movesList = []

  for (const available of availables) {
    if (step <= 0) {
      return 0
    }

    const move = newGrid[available]
    newGrid[available] = player

    minimaxQuatre(newGrid, player, step - 1)
    const movescore = scoreQuatre[available]
    newGrid[available] = move
    scoresList.push(movescore)
    movesList.push(move)
  }

  const lowScore = Math.min(...scoresList)
  const lowScoreIndex = scoresList.indexOf(lowScore)
  AIMove4 = movesList[lowScoreIndex]
  return scoresList[lowScoreIndex]
}

// ----- MORPION 3x3 ----- //

async function morpion3x3 (message, level, gmode) {
  level = level + 2
  const messageEmbedTrois = new MessageEmbed()
    .setTitle('Morpion')
    .setDescription('Voici une nouvelle partie de morpion !')
    .setColor('#0099ff')

  const row1x3 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-0`)
        .setLabel('0')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-1`)
        .setLabel('1')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-2`)
        .setLabel('2')
        .setStyle('SECONDARY')

    )

  const row2x3 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-3`)
        .setLabel('3')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-4`)
        .setLabel('4')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-5`)
        .setLabel('5')
        .setStyle('SECONDARY')

    )

  const row3x3 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-6`)
        .setLabel('6')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-7`)
        .setLabel('7')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-8`)
        .setLabel('8')
        .setStyle('SECONDARY')

    )

  const grille = await message.channel.send({ embeds: [messageEmbedTrois], components: [row1x3, row2x3, row3x3] })

  let Play3 = 1
  let Turn3 = 1
  let AI3

  while (Play3 !== 0) {
    const Available = gridTrois.filter(function (a) {
      return typeof a === 'number'
    })
    if ((winTrois(gridTrois) === 1) || (winTrois(gridTrois) === -1) || (Available.length === 0)) {
      Play3 = 0

      gridTrois = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ]

      if (Available.length === 0) {
        const EndEmbed = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('La partie est terminée !')
          .addField('Gagnant', 'Match nul !')
          .setColor('#0099ff')
        grille.edit({ embeds: [EndEmbed], components: [] })
      } else {
        const EndEmbed = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('La partie est terminée !')
          .addField('Gagnant', `${Turn3 !== 1 ? `**${message.author}**` : '**Code Industry**'}`)
          .setColor('#0099ff')

        grille.edit({ embeds: [EndEmbed], components: [] })
      }
    } else {
      let played = 0
      if (Turn3 === 1) {
        AI3 = '❌'
        const messageEmbedTrois = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('Pour gagner il suffit d\'alligner 3 fois votre signe (❌) en ligne, en colonne ou en diagonale !')
          .addField(`${message.author.username}`, 'Votre tour !')
          .addField('Code Industry', 'Te regarde jouer 👀')
          .setColor('#0099ff')
        grille.edit({ embeds: [messageEmbedTrois] })

        while (played === 0) {
          Turn3 = 0
          const filter = i => {
            return i.user.id === message.author.id && i.customId.startsWith(`${message.author.id}-`)
          }

          await grille.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
            .then(async i => {
              const availables = gridTrois.filter(function (a) {
                return typeof a === 'number'
              })
              if (!availables.includes(parseInt(i.customId.split('-')[1]))) {
                return
              }
              gridTrois[i.customId.slice(19)] = AI3
              played = 1
              i.reply({ content: 'Vous venez de jouer avec succès !', ephemeral: false })

              const row1 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-0`)
                    .setLabel(`${gridTrois[0]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-1`)
                    .setLabel(`${gridTrois[1]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-2`)
                    .setLabel(`${gridTrois[2]}`)
                    .setStyle('SECONDARY')

                )

              const row2 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-3`)
                    .setLabel(`${gridTrois[3]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-4`)
                    .setLabel(`${gridTrois[4]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-5`)
                    .setLabel(`${gridTrois[5]}`)
                    .setStyle('SECONDARY')

                )

              const row3 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-6`)
                    .setLabel(`${gridTrois[6]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-7`)
                    .setLabel(`${gridTrois[7]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-8`)
                    .setLabel(`${gridTrois[8]}`)
                    .setStyle('SECONDARY')

                )

              await grille.edit({ embeds: [messageEmbedTrois], components: [row1, row2, row3] })
              await wait(100)
              i.deleteReply()
            })
            .catch(async () => null)
        }
      } else {
        AI3 = '⭕'
        const messageEmbedTrois = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('Pour gagner il suffit d\'alligner 3 fois votre signe (❌) en ligne, en colonne ou en diagonale !')
          .addField(`${message.author.username}`, 'Reste patiens !')
          .addField('Code Industry', 'À moi de jouer (je peut mettre du temps à jouer le premier coup... je met parfois du temps à réfléchir 😁')
          .setColor('#0099ff')
        await grille.edit({ embeds: [messageEmbedTrois] })
        Turn3 = 1
        minimaxTrois(gridTrois, AI3, level)
        gridTrois[AIMove3] = AI3

        const row1 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-0`)
              .setLabel(`${gridTrois[0]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-1`)
              .setLabel(`${gridTrois[1]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-2`)
              .setLabel(`${gridTrois[2]}`)
              .setStyle('SECONDARY')

          )

        const row2 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-3`)
              .setLabel(`${gridTrois[3]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-4`)
              .setLabel(`${gridTrois[4]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-5`)
              .setLabel(`${gridTrois[5]}`)
              .setStyle('SECONDARY')

          )

        const row3 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-6`)
              .setLabel(`${gridTrois[6]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-7`)
              .setLabel(`${gridTrois[7]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-8`)
              .setLabel(`${gridTrois[8]}`)
              .setStyle('SECONDARY')

          )

        grille.edit({ embeds: [messageEmbedTrois], components: [row1, row2, row3] })
      }
    }
  }
  ;
}







// ----- MORPION 4x4 ----- //

async function morpion4x4 (message, level = 2, gmode) {
  if (level === 1) {
    level = 2
  }
  if (level === 2) {
    level = 3
  }
  if (level === 3) {
    level = 4
  }
  const messageEmbedQuatre = new MessageEmbed()
    .setTitle('Morpion')
    .setDescription('Voici une nouvelle partie de morpion !')
    .setColor('#0099ff')

  const row1x4 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-0`)
        .setLabel('0')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-1`)
        .setLabel('1')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-2`)
        .setLabel('2')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-3`)
        .setLabel('3')
        .setStyle('SECONDARY')

    )

  const row2x4 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-4`)
        .setLabel('4')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-5`)
        .setLabel('5')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-6`)
        .setLabel('6')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-7`)
        .setLabel('7')
        .setStyle('SECONDARY')

    )

  const row3x4 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-8`)
        .setLabel('8')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-9`)
        .setLabel('9')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-10`)
        .setLabel('10')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-11`)
        .setLabel('11')
        .setStyle('SECONDARY')

    )

  const row4x4 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-12`)
        .setLabel('12')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-13`)
        .setLabel('13')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-14`)
        .setLabel('14')
        .setStyle('SECONDARY')

    )
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-15`)
        .setLabel('15')
        .setStyle('SECONDARY')

    )

  const rowForfate = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-forfate`)
        .setLabel('Déclarer forfait')
        .setStyle('PRIMARY')

    )
  const grille = await message.channel.send({ embeds: [messageEmbedQuatre], components: [row1x4, row2x4, row3x4, row4x4, rowForfate] })

  let Play4 = 1
  let Turn4 = 1
  let AI4
  const Available = gridQuatre.filter(function (a) {
    return typeof a === 'number'
  })

  while (Play4 !== 0) {
    if ((winQuatre() === 1) || (winQuatre() === -1) || (Available.length === 0)) {
      Play4 = 0

      gridQuatre = [
        0, 1, 2, 3,
        4, 5, 6, 7,
        8, 9, 10, 11,
        12, 13, 14, 15
      ]

      if (Available.length === 0) {
        const EndEmbed = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('La partie est terminée !')
          .addField('Gagnant', 'Match nul !')
          .addField('Mode de jeu', `${gmode}`)
          .setColor('#0099ff')
        grille.edit({ embeds: [EndEmbed], components: [] })
      } else {
        const EndEmbed = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription('La partie est terminée !')
          .addField('Gagnant', `${Turn4 !== 1 ? `**${message.author}**` : '**Code Industry**'}`)
          .addField('Mode de jeu', `${gmode}`)
          .setColor('#0099ff')

        grille.edit({ embeds: [EndEmbed], components: [] })
      }
    } else {
      let played = 0
      if (Turn4 === 1) {
        const messageEmbedQuatre = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription(`Pour gagner il suffit d'alligner 3 fois votre signe (❌) en ligne, en colonne ou en diagonale !\nLe mode de jeu actuelle est : **${gmode}**`)
          .addField(`${message.author.username}`, 'Votre tour !')
          .addField('Code Industry', 'Te regarde jouer 👀')
          .setColor('#0099ff')
        grille.edit({ embeds: [messageEmbedQuatre] })


        AI4 = '❌'

        while (played === 0) {
          Turn4 = 0
          const filter = i => {
            return i.user.id === message.author.id && i.customId.startsWith(`${message.author.id}-`)
          }

          await grille.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
            .then(async i => {
              const availables = gridQuatre.filter(function (a) {
                return typeof a === 'number'
              })
              if (!availables.includes(parseInt(i.customId.split('-')[1]))) {
                return
              }

              gridQuatre[i.customId.slice(19)] = AI4
              played = 1
              await i.reply({ content: 'Vous venez de jouer avec succès !', ephemeral: false })

              const row1 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-0`)
                    .setLabel(`${gridQuatre[0]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-1`)
                    .setLabel(`${gridQuatre[1]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-2`)
                    .setLabel(`${gridQuatre[2]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-3`)
                    .setLabel(`${gridQuatre[3]}`)
                    .setStyle('SECONDARY')

                )

              const row2 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-4`)
                    .setLabel(`${gridQuatre[4]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-5`)
                    .setLabel(`${gridQuatre[5]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-6`)
                    .setLabel(`${gridQuatre[6]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-7`)
                    .setLabel(`${gridQuatre[7]}`)
                    .setStyle('SECONDARY')

                )

              const row3 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-8`)
                    .setLabel(`${gridQuatre[8]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-9`)
                    .setLabel(`${gridQuatre[9]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-10`)
                    .setLabel(`${gridQuatre[10]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-11`)
                    .setLabel(`${gridQuatre[11]}`)
                    .setStyle('SECONDARY')

                )

              const row4 = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-12`)
                    .setLabel(`${gridQuatre[12]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-13`)
                    .setLabel(`${gridQuatre[13]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-14`)
                    .setLabel(`${gridQuatre[14]}`)
                    .setStyle('SECONDARY')

                )
                .addComponents(
                  new MessageButton()
                    .setCustomId(`${message.author.id}-15`)
                    .setLabel(`${gridQuatre[15]}`)
                    .setStyle('SECONDARY')

                )

              await grille.edit({ embeds: [messageEmbedQuatre], components: [row1, row2, row3, row4] })
              await wait(100)
              await i.deleteReply()
            })
            .catch(async () => null)
        }
      } else {
        AI4 = '⭕'
        Turn4 = 1
        const messageEmbedQuatre = new MessageEmbed()
          .setTitle('Morpion')
          .setDescription(`Pour gagner il suffit d'alligner 3 fois votre signe (❌) en ligne, en colonne ou en diagonale !\nLe mode de jeu actuelle est : **${gmode}**`)
          .addField(`${message.author.username}`, 'Reste patiens !')
          .addField('Code Industry', 'À moi de jouer (je peut mettre du temps à jouer le premier coup... je met parfois du temps à réfléchir 😁')
          .setColor('#0099ff')
        await grille.edit({ embeds: [messageEmbedQuatre] })


        minimaxQuatre(gridQuatre, AI4, level)
        gridQuatre[AIMove4] = AI4

        const row1 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-0`)
              .setLabel(`${gridQuatre[0]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-1`)
              .setLabel(`${gridQuatre[1]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-2`)
              .setLabel(`${gridQuatre[2]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-3`)
              .setLabel(`${gridQuatre[3]}`)
              .setStyle('SECONDARY')

          )

        const row2 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-4`)
              .setLabel(`${gridQuatre[4]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-5`)
              .setLabel(`${gridQuatre[5]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-6`)
              .setLabel(`${gridQuatre[6]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-7`)
              .setLabel(`${gridQuatre[7]}`)
              .setStyle('SECONDARY')

          )

        const row3 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-8`)
              .setLabel(`${gridQuatre[8]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-9`)
              .setLabel(`${gridQuatre[9]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-10`)
              .setLabel(`${gridQuatre[10]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-11`)
              .setLabel(`${gridQuatre[11]}`)
              .setStyle('SECONDARY')

          )

        const row4 = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-12`)
              .setLabel(`${gridQuatre[12]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-13`)
              .setLabel(`${gridQuatre[13]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-14`)
              .setLabel(`${gridQuatre[14]}`)
              .setStyle('SECONDARY')

          )
          .addComponents(
            new MessageButton()
              .setCustomId(`${message.author.id}-15`)
              .setLabel(`${gridQuatre[15]}`)
              .setStyle('SECONDARY')

          )

        grille.edit({ embeds: [messageEmbedQuatre], components: [row1, row2, row3, row4] })
      }
    }
  }
  ;
}

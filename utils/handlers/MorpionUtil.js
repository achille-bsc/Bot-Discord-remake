/* eslint-disable no-multiple-empty-lines */


/* const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

function wait (waitTime = 5000) {
  return new Promise(resolve => setTimeout(resolve, waitTime))
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

// let AIMove3
// win function 3x3
// function winTrois () {
//   // Tableau de toutes les possibilités de victoire
//   const WinSituation = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],

//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],

//     [0, 4, 8],
//     [6, 4, 2]
//   ]

//   for (let i = 0; i < WinSituation.length; i++) {
//     const TestRow = WinSituation[i]
//     const RowValues = []

//     // vérifier la victoire
//     for (let j = 0; j < TestRow.length; j++) {
//       RowValues.push(gridTrois[TestRow[j]])
//     }

//     const CrossesWin = function (Value) {
//       return Value === '❌'
//     }

//     const NoughtsWin = function (Value) {
//       return Value === '⭕'
//     }

//     if (RowValues.every(CrossesWin)) {
//       return 1
//     } else if (RowValues.every(NoughtsWin)) {
//       return -1
//     }
//   }
// }

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
function checkWin (type) {
  // Tableau de toutes les possibilités de victoire
  // Tableau de toutes les possibilités de victoire
  const WinSituation4 = [
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
  const WinSituation3 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [6, 4, 2]
  ]

  for (const situation of (type === '4' ? WinSituation4 : WinSituation3)) {
    const RowValues = []

    // vérifier la victoire
    for (const test of situation) {
      RowValues.push((type === '4' ? gridQuatre : gridTrois)[test])
    }

    if (RowValues.every((value) => value === '❌')) {
      return -1
    } else if (RowValues.every((value) => value === '⭕')) {
      return 1
    }
  }
  return 0
}

// function minimaxTrois (newGrid, player, level) {
//   let limit = 0
//   const availables = newGrid.filter(function (a) {
//     return typeof a === 'number'
//   })

//   if (winTrois(newGrid) === 1) {
//     return 1
//   } else if (winTrois(newGrid) === -1) {
//     return -1
//   } else if (availables.length === 0) {
//     return 0
//   }

//   const moves = []
//   const scores = []

//   for (const available of availables) {
//     const move = newGrid[available]
//     newGrid[available] = player
//     if (player === '❌' && limit < level) {
//       limit = limit + 1
//       scores.push(minimaxTrois(newGrid, '⭕', 4))
//     } else if (player === '⭕' && limit < level) {
//       limit = limit + 1
//       scores.push(minimaxTrois(newGrid, '❌', 4))
//     }
//     newGrid[available] = move
//     moves.push(move)
//   }

//   if (player === '❌') {
//     const HighScore = Math.max(...scores)
//     const HighScoreIndex = scores.indexOf(HighScore)
//     AIMove3 = moves[HighScoreIndex]
//     return scores[HighScoreIndex]
//   } else {
//     const LowScore = Math.min(...scores)
//     const LowScoreIndex = scores.indexOf(LowScore)
//     AIMove3 = moves[LowScoreIndex]
//     return scores[LowScoreIndex]
//   }
// }

function evaluate (grid) {
  let total = 0
  for (const position of grid) {
    if (typeof position !== 'number') {
      continue
    }
    const sign = position === '⭕' ? 1 : -1
    const movescore = scoreQuatre[position]
    total += sign * movescore
  }
  return total
}


function minimax (newGrid, player, depth, type) {
  const winner = checkWin(type)
  if (winner === -1 || winner === 1) return winner * 1000

  if (depth <= 0) return evaluate(newGrid)

  const availables = newGrid.filter((a) => typeof a === 'number')

  if (player === '⭕') {
    let score = -Infinity
    for (const available of availables) {
      const move = newGrid[available]

      newGrid[available] = '❌'
      score = Math.max(minimax(newGrid, '❌', depth - 1, type), score)
      newGrid[available] = move
    }

    return score
  } else {
    let score = +Infinity
    for (const available of availables) {
      const move = newGrid[available]

      newGrid[available] = '⭕'
      score = Math.min(minimax(newGrid, '⭕', depth - 1, type), score)
      newGrid[available] = move
    }
    return score
  }
}

function rows (message, grid) {
  const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-0`)
        .setLabel(`${typeof grid[0] === 'number' ? grid[0] + 1 : grid[0]}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-1`)
        .setLabel(`${typeof grid[1] === 'number' ? grid[1] + 1 : grid[1]}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-2`)
        .setLabel(`${typeof grid[2] === 'number' ? grid[2] + 1 : grid[2]}`)
        .setStyle('SECONDARY'),
      grid === gridQuatre
        ? new MessageButton()
          .setCustomId(`${message.author.id}-3`)
          .setLabel(`${typeof grid[3] === 'number' ? grid[3] + 2 : grid[3]}`)
          .setStyle('SECONDARY')
        : null

    )

  console.log((grid === gridQuatre ? (typeof grid[4] === 'number' ? grid[4] + 1 : grid[4]) : (typeof grid[3] === 'number' ? grid[3] + 1 : grid[3])))

  const row2 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '4' : '3'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[4] === 'number' ? grid[4] + 1 : grid[4]) : (typeof grid[3] === 'number' ? grid[3] + 1 : grid[3]))}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '5' : '4'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[5] === 'number' ? grid[5] + 1 : grid[5]) : (typeof grid[4] === 'number' ? grid[4] + 1 : grid[4]))}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '6' : '5'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[6] === 'number' ? grid[6] + 1 : grid[6]) : (typeof grid[5] === 'number' ? grid[5] + 1 : grid[5]))}`)
        .setStyle('SECONDARY'),
      grid === gridQuatre
        ? new MessageButton()
          .setCustomId(`${message.author.id}-7`)
          .setLabel(`${typeof grid[7] === 'number' ? grid[7] + 2 : grid[7]}`)
          .setStyle('SECONDARY')
        : null


    )

  const row3 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '8' : '6'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[8] === 'number' ? grid[8] + 1 : grid[8]) : (typeof grid[6] === 'number' ? grid[6] + 1 : grid[6]))}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '9' : '7'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[9] === 'number' ? grid[9] + 1 : grid[9]) : (typeof grid[7] === 'number' ? grid[7] + 1 : grid[7]))}`)
        .setStyle('SECONDARY'),
      new MessageButton()
        .setCustomId(`${message.author.id}-${grid === gridQuatre ? '10' : '8'}`)
        .setLabel(`${(grid === gridQuatre ? (typeof grid[10] === 'number' ? grid[10] + 1 : grid[10]) : (typeof grid[8] === 'number' ? grid[8] + 1 : grid[8]))}`)
        .setStyle('SECONDARY'),
      grid === gridQuatre
        ? new MessageButton()
          .setCustomId(`${message.author.id}-11`)
          .setLabel(`${typeof grid[11] === 'number' ? grid[11] + 2 : grid[11]}`)
          .setStyle('SECONDARY')
        : null
    )
  let row4 = null

  if (grid === gridQuatre) {
    row4 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(`${message.author.id}-12`)
          .setLabel(`${typeof grid[12] === 'number' ? grid[12] + 1 : grid[12]}`)
          .setStyle('SECONDARY')

      )
      .addComponents(
        new MessageButton()
          .setCustomId(`${message.author.id}-13`)
          .setLabel(`${typeof grid[13] === 'number' ? grid[2] + 1 : grid[2]}`)
          .setStyle('SECONDARY')

      )
      .addComponents(
        new MessageButton()
          .setCustomId(`${message.author.id}-14`)
          .setLabel(`${typeof grid[14] === 'number' ? grid[14] + 1 : grid[14]}`)
          .setStyle('SECONDARY')

      )
      .addComponents(
        new MessageButton()
          .setCustomId(`${message.author.id}-15`)
          .setLabel(`${typeof grid[15] === 'number' ? grid[15] + 1 : grid[15]}`)
          .setStyle('SECONDARY')
      )
  }
  if (row4 === null) {
    return [row1, row2, row3]
  } else {
    return [row1, row2, row3, row4]
  }
}


// ----- MORPION 3x3 ----- //

async function morpion3x3 (message, level, gmode) {
  level = 5

  const messageEmbedTrois = new MessageEmbed()
    .setTitle('Morpion')
    .setDescription('Voici une nouvelle partie de morpion !')
    .setColor('#0099ff')



  // const grille = await message.channel.send({ embeds: [messageEmbedTrois], components: [row1x3, row2x3, row3x3] })

  const grille = await message.channel.send({ embeds: [messageEmbedTrois], components: rows(message, gridTrois) })

  let Play3 = 1
  let Turn3 = 1
  let AI3

  while (Play3 !== 0) {
    const Available = gridTrois.filter(function (a) {
      return typeof a === 'number'
    })
    if ((checkWin('3') === 1) || (checkWin('3') === -1) || (Available.length === 0)) {
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

              await grille.edit({ embeds: [messageEmbedTrois], components: rows(message, gridTrois) })
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


        let score = -Infinity
        let move
        const availables = gridQuatre.filter((a) => typeof a === 'number')

        for (const position of availables) {
          const oldCase = gridQuatre[position]
          gridQuatre[position] = AI3
          const testScore = minimax(gridTrois, AI3, level, '3')
          if (testScore > score) {
            score = testScore
            move = position
          }
          gridQuatre[position] = oldCase
        }

        gridTrois[move] = AI3

        await grille.edit({ embeds: [messageEmbedTrois], components: rows(message, gridTrois) })
      }
    }
  }
  ;
}







// ----- MORPION 4x4 ----- //

async function morpion4x4 (message, level = 2, gmode) {
  if (level === 1) {
    level = 3
  }
  const messageEmbedQuatre = new MessageEmbed()
    .setTitle('Morpion')
    .setDescription('Voici une nouvelle partie de morpion !')
    .setColor('#0099ff')

  const grille = await message.channel.send({ embeds: [messageEmbedQuatre], components: rows(message, gridQuatre) })

  let Play4 = 1
  let Turn4 = 1
  let AI4
  const Available = gridQuatre.filter(function (a) {
    return typeof a === 'number'
  })

  while (Play4 !== 0) {
    if ((checkWin('4') === 1) || (checkWin('4') === -1) || (Available.length === 0)) {
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

              await grille.edit({ embeds: [messageEmbedQuatre], components: rows(message, gridQuatre) })
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


        let score = -Infinity
        let move
        const availables = gridQuatre.filter((a) => typeof a === 'number')

        for (const position of availables) {
          const oldCase = gridQuatre[position]
          gridQuatre[position] = AI4
          const testScore = minimax(gridQuatre, AI4, level, '4')
          if (testScore > score) {
            score = testScore
            move = position
          }
          gridQuatre[position] = oldCase
        }

        gridQuatre[move] = AI4

        grille.edit({ embeds: [messageEmbedQuatre], components: rows(message, gridQuatre) })
      }
    }
  }
  ;
} */

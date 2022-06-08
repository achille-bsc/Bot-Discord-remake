const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)
const Logger = require('../logger')

module.exports = async (client) => {
  (await pGlob(`${process.cwd()}/modals/*/*.js`)).map(async modalFile => {
    const modal = require(modalFile)
    if (!modal.name) return Logger.warn(`Boutton non-chargée: Ajoutez un NOM à votre commande\nFichier -> ${modalFile}`)
    client.modals.set(modal.name, modal)
    console.log(`${modal.name}`.green, '=> ' + 'Chargée'.blue)
  })
}

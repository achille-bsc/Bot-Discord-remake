const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)
const Logger = require('../logger')

module.exports = async (client) => {
	// eslint-disable-next-line no-undef
	(await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btnFile => {
		const btn = require(btnFile)
		if (!btn.name) return Logger.warn(`Boutton non-chargée: Ajoutez un NOM à votre commande\nFichier -> ${btnFile}`)
		client.buttons.set(btn.name, btn)
	})
}

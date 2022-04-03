const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const ascii = require('ascii-table');
const table = new ascii('Commandes');
const Logger = require('../logger');

module.exports = async (client) => {
	(await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btnFile => {
		const btn = require(btnFile);
		if (!btn.name) return Logger.warn(`Boutton non-chargée: Ajoutez un NOM à votre commande\nFichier -> ${btnFile}`)
		client.buttons.set(btn.name, btn);
	});
};
const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const ascii = require('ascii-table');
const table = new ascii('Commandes');

module.exports = async (client) => {
	(await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
		const cmd = require(cmdFile);

		if (!cmd.name || !cmd.description) return table.addRow(`\n-----\Commande Non-Chargée: pas de nom et/ou description\nFichier => ${cmdFile}\n-----\n`, 'Non-Chargée');
		client.commands.set(cmd.name, cmd);
		table.addRow(cmd.name, 'Prêt');

	});
	console.log(table.toString().bold.cyan);
	console.log('\n')
};
const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const ascii = require('ascii-table');
const table = new ascii('Commandes');

module.exports = async (client) => {
	(await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
		const cmd = require(cmdFile);

		if (!cmd.name || !cmd.description) return table.addRow(`${cmd.name || cmdFile}`, 'Non-Chargée');
		client.commands.set(cmd.name, cmd);
		table.addRow(cmd.name, 'Chargé');

	});
	console.log(table.toString().bold.cyan);
	console.log('\n')
};
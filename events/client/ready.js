const colors = require('colors');
module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'.bold.green);
		console.log('┃                               ┃'.bold.green);
		console.log('┃     Le bot est connecté !     ┃'.bold.green);
		console.log('┃                               ┃'.bold.green);
		console.log('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n'.bold.green);

		// Instantané
		/* const devGuild = await client.guilds.cache.get('841813630172790834');
		devGuild.commands.set(client.commands.map(cmd => cmd)); */
		
		// Global => 1H minimum
		client.application.commands.set(client.commands.map(cmd => cmd));
	},
};
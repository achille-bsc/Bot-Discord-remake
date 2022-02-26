const color = require('colors');
const ascii = require('ascii-table');
const table = new ascii('Commands');
const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose')
const client = new Client({ intents: 515 });

client.commands = new Collection();

['EventUtil', 'CommandUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client); });

process.on('exit', code => { console.log(`Le precessus s'est arrêté avec le code ${code} !`) })
process.on('uncaughtException', (err, origin) => { console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`) })
process.on('unhandledRejection', (reason, promise) => { console.log(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise ) })
process.on('warning', (...args) => { console.log(...args) })

mongoose.connect(process.env.DATABASE_URI, {
	autoIndex: false, 
	maxPoolSize: 10, 
	serverSelectionTimeoutMS: 5000, 
	socketTimeoutMS: 45000,
	family: 4
}).then (() => { 
	console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                      ┃
┃     Le client est connecté à la base de donnée !     ┃
┃                                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`.bold.magenta);
	console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                ┃
┃     Chargement en Cours...     ┃
┃                                ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`.bold.yellow);
})
.catch (err => { console.log(`${err}`.bold.red) })

client.login(process.env.TOKEN)
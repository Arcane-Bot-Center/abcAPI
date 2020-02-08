const abcAPI = require('../src/index');

const { Client } = require('discord.js'),
       client = new Client();

client.login("Bot TOKEN");

client.on('ready',() =>{
    abcAPI.login(AbcToken, client.user.id); // => require to use this module, log in to abcAPI
    abcAPI.update(client); // => made update every minutes
    abcAPI.post(client); // => made simple post to this abcAPI
});

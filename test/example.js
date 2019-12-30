const abcAPI = require('../src/index');

const { Client } = require('discord.js'),
    client = new Client();

client.login('Bot TOKEN');

client.on('ready',() =>{
        abcAPI.login('API Key', client.user.id);
    abcAPI.post(client.guilds.size, client.users.size, "Number of shards");
});
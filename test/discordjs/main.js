const {Client} = require("discord.js");
const client = new Client();


client.login('bot token');
const api = require('../../main');
client.on('ready',()=>{
    console.log('bot ready');
    const  arcane = new api({ lib:'discord.js',
        client:client, // Your client
        token: 'arcane token', //your abc Api token
        autoSend: true    // send automaticly stats (arcane.update() not require). Default is true
    });

    arcane.on("ready",() =>{
        console.log('ABC API ready');
        arcane.update() // made simple post require if autoSend is false
    });

    arcane.on('post',(data)=>{
        console.log(data)
        // return { server_count: Your guild number, shard_count:  Your shard number }
    });
    arcane.on('error',(error)=>{
        console.log(error)
        //return error
    });
    arcane.on('rateLimited',(response)=>{
        console.log(response)
        //return You have been ratelimited please contact the support
    });

    arcane.getInfo(botid).then((data)=>{
        console.log(data)
    });
});
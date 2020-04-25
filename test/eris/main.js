const Eris = require("eris");
let api = require('../../main');
var bot = new Eris('bot token');

bot.connect();
bot.on('ready',()=>{
    console.log("bot ready");

    const  arcane = new api({ lib:'eris',
        client:bot, // Your client
        token:'abcapi token', //your abc Api token
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
    arcane.on('rateLimited',(responce)=>{
        console.log(responce)
        //return You have been ratelimited please contact the support
    })

});


'use strict';

const Base = require('eris-sharder').Base;
class Class extends Base {
    constructor(bot) {
        super(bot);
    }

    async launch() {
        this.bot.on('ready', this.ready.bind(this));
        this.ready();
    }

    ready() {
        let api = require('../../main');
        const  arcane = new api({ lib:'eris',
            client:client, // Your client
            token:'abcapi token', //your abc Api token
            autoSend: true    // send automaticly stats (arcane.update() not require). Default is true
        });

        arcane.on("ready",() =>{
            console.log('ABC API ready');
            arcane.update() // made simple post
        });
        arcane.on('post',(data)=>{
            console.log(data)
            // return { server_count: Your guild number, shard_count:  Your shard number }
        });
        arcane.on('error',(error)=>{
            console.log(error)
            //return error
        });
        arcane.on('rateLimited',(data)=>{
            console.log(data)
            //return You have been ratelimited please contact the support
        })

    }

}

module.exports = Class;

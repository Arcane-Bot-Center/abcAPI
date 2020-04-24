const { EventEmitter } = require('events'), axios = require('axios');

class ABCapi extends EventEmitter {
    constructor(opts = { lib, client, token }) {
        super(opts);
        this.opts = opts;
        this.run = false;
        this.cooldown = 10000
        setTimeout(() => { this._ready(); }, 2000);


    }
    _ready(){
        if(!this.run){
            this.emit('ready');
            this.run = true;
            setInterval(() => { this.update(); }, this.cooldown);
        }else{
            console.log('deja prêt')
        }
    }

    update(){
        let lib = this.opts.lib.toString().toLowerCase()
        console.log()
        if(lib === 'eris'){
            console.log('eris');
            require('./lib/eris')
            this.emit('post');
        }else if(lib === 'discord' || lib === 'discordjs' || lib === 'discord.js'){
            console.log('discord');
            require('./lib/discordjs').run(this.opts)
            this.emit('post');
        }else{
            console.log('pas connu')
        }
    }



}

module.exports = ABCapi;
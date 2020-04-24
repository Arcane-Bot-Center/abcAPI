const { EventEmitter } = require('events');
const Logger = require('./utils/logger');
class ABCapi extends EventEmitter {
    constructor(opts = { lib, client, token }) {
        super(opts);
        this.opts = opts;
        this.run = false;
        this.cooldown = 10000;
        setTimeout(() => { this._ready(); }, 2000);


    }
    _ready(){
        if(!this.run){
            this.emit('ready');
            this.run = true;
            setInterval(() => { this.update(); }, this.cooldown);
        }else{
            Logger.log('Module already launched')
        }
    }

    update(){
        let lib = this.opts.lib.toString().toLowerCase();
        if(lib === 'eris'){
            require('./lib/eris').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post')
                }
            }).catch((err)=>{
                if(err.response.status === 429){
                    this.emit('rateLimited')
                }else{
                    this.emit('error')
                }
            });
        }else if(lib === 'discord' || lib === 'discordjs' || lib === 'discord.js'){
            require('./lib/discordjs').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post')
                }
            }).catch((err)=>{
                if(err.response.status === 429){
                    this.emit('rateLimited',err.data)
                }else{
                    this.emit('error',err)
                }
            })
        }else{
            Logger.CriticalError('Unknown library supported \'discord.js\', and \'eris\'.','0x0000404')
        }
    }



}

module.exports = ABCapi;
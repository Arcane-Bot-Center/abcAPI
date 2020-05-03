const { EventEmitter } = require('events');
const Logger = require('./utils/logger');
class ABCapi extends EventEmitter {
    constructor(opts = { lib:false, client:false, token:false,autoSend:true }) {
        super(opts);
        this.opts = opts;
        this.run = false;
        this.cooldown = 10000;
        this.logger = Logger;
        setTimeout(() => { this._ready(); }, 2000);
    }
    _ready(){
        if(!this.run){

            if(!this.opts.token || typeof this.opts.token !== "string") return this.logger.CriticalError('Token is not provided','0x0000404',!this.opts.token ?'Token not found':typeof this.opts.token !== "string" ? 'Token must be string':'Unknown error');
            if(!this.opts.client || typeof this.opts.client !== "object") return this.logger.CriticalError('Client is not provided','0x0000404',!this.opts.client ?'Client not found':typeof this.opts.client !== "object" ? 'Client must be object':'Unknown error');
            if(!this.opts.lib || typeof this.opts.lib !== "string") return this.logger.CriticalError('Library is not provided','0x0000404',!this.opts.lib ?'Library not found':typeof this.opts.lib !== "string" ? 'Library must be string':'Unknown error');
            if(!this.opts.autoSend || typeof this.opts.autoSend !== "boolean") return this.logger.CriticalError('Autosend is not provided','0x0000404',!this.opts.autoSend ?'Autosend not found':typeof this.opts.autoSend !== "boolean" ? 'Autosend must be string':'Unknown error');

            this.run = true;
            this.emit('ready');
            this.opts.autoSend ? setInterval(() => { this.update(); }, this.cooldown): false;
        }else{
            this.logger.log('Module already launched')
        }
    }


    update(){
        if(!this.run) this.logger.error('Module not started');
        let lib = this.opts.lib.toString().toLowerCase();
        if(lib === 'eris'){
            require('./lib/eris').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                require('./utils/ErrorHandler').error(this,err)
            })
        }else if(lib === 'discord' || lib === 'discordjs' || lib === 'discord.js' || lib === 'djs'){
            require('./lib/discordjs').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                require('./utils/ErrorHandler').error(this,err)
            })
        }else if(lib === 'eris sharder' || lib === 'erissharder' || lib === 'eris-sharder'){
            require('./lib/eris-sharder').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                require('./utils/ErrorHandler').error(this,err)
            })
        }else{
            this.logger.CriticalError('Unknown library supported \'discord.js\' , \'eris-sharder\', and \'eris\'.','0x0000404',`Library not found, you provided ${this.opts.lib}`)
        }
    }

    getInfo(id) {
        return new Promise((resolve, reject) => {
            resolve('This endpoint is not implemented');
            const {get} = require('axios');
            get(`https://arcane-center.xyz/api/${id}/stats`).then((res) => {
                let data = {
                    content: {
                        owner: res.data.owner,
                        addedAt: res.data.timestamp,
                        botInfos: {
                            name: res.data.bot.username,
                            tags: res.data.infos.tags,
                            prefix: res.data.infos.prefix,
                            smallDesc: res.data.infos.sdesc,
                        },
                        api: {
                            vote: res.data.api.vote,
                            shard: res.data.api.shard,
                            server: res.data.api.server
                        }
                    }
                };
                resolve(data)
            }).catch((err) => {
                require('./utils/ErrorHandler').error(this,err)
            })
        })
    }

}

module.exports = ABCapi;
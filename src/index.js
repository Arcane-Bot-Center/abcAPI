const { EventEmitter } = require('events');
const Logger = require('./utils/logger');
class ABCapi extends EventEmitter {
    constructor(opts = { lib, client, token,autoSend:true }) {
        super(opts);
        this.opts = opts;
        this.run = false;
        this.cooldown = 10000;
        setTimeout(() => { this._ready(); }, 2000);
    }
    _ready(){
        if(!this.run){
            this.run = true;
            this.emit('ready');
            this.opts.autoSend ? setInterval(() => { this.update(); }, this.cooldown): false;
        }else{
            Logger.log('Module already launched')
        }
    }

    update(){
        console.log(this.run)
        if(!this.run) Logger.error('Module not started')
        let lib = this.opts.lib.toString().toLowerCase();
        if(lib === 'eris'){
            require('./lib/eris').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                if(err.response){
                    if(err.response.status === 429){
                        err.data = {
                            message:'You have been ratelimited please contact the support'
                        };
                        this.emit('rateLimited',err.data)
                    }else{
                        this.emit('error',err)
                    }
                }else{
                    Logger.CriticalError(`A critical error has occurred`,'0x0000503',err)
                }

            });
        }else if(lib === 'discord' || lib === 'discordjs' || lib === 'discord.js'){
            require('./lib/discordjs').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                if(err.response){
                    if(err.response.status === 429){
                        err.data = {
                            message:'You have been ratelimited please contact the support'
                        };
                        this.emit('rateLimited',err.data)
                    }else{
                        console.log(err.data)
                        this.emit('error',err)
                    }
                }else{
                    Logger.CriticalError(`A critical error has occurred`,'0x0000503',err)
                }
            })
        }else if(lib === 'eris sharder' || lib === 'erissharder' || lib === 'eris-sharder'){
            require('./lib/eris-sharder').run(this.opts).then(res => {
                if(res.status === 200){
                    this.emit('post',res.data)
                }
            }).catch((err)=>{
                if(err.response){
                    if(err.response.status === 429){
                        err.data = {
                            message:'You have been ratelimited please contact the support'
                        };
                        this.emit('rateLimited',err.data)
                    }else{
                        this.emit('error',err)
                    }
                }else{
                    Logger.CriticalError(`A critical error has occurred`,'0x0000503',err)
                }
            })
        }else{
            Logger.CriticalError('Unknown library supported \'discord.js\' , \'eris-sharder\', and \'eris\'.','0x0000404',`Library not found, you provided ${this.opts.lib}`)
        }
    }

    getInfo(id) {

        return new Promise((resolve, reject) => {
            resolve('This endpoint is not implemented');
            const {get} = require('axios');
            get(`https://arcane-center.xyz/api/${id}/stats`).then((res) => {
                let data = {
                    status: res.data.status,
                    content: {
                        verified: res.data.verified,
                        certified: res.data.certified,
                        owner: res.data.owner,
                        co_owner: res.data.co_owner,
                        addedAt: res.data.timestamp,
                        premium: res.data.premium,
                        votes: res.data.voted.size,
                        bot: {
                            botid: res.data.bot._id,
                            name: res.data.bot.username
                        },
                        infos: {
                            tags: res.data.infos.tags,
                            lib: res.data.infos.lib,
                            prefix: res.data.infos.prefix,
                            smallDesc: res.data.infos.sdesc,
                            invite: res.data.infos.link,
                            website: res.data.infos.website,
                            github: res.data.infos.github,
                            support: res.data.infos.support,
                            nsfwWarn: res.data.infos.nsfwWarn,
                            nsfwBlur: res.data.infos.nsfwBlur,
                            youtube: res.data.infos.youtube
                        },
                        premium_infos: {
                            paypal: res.data.premium_infos.paypal,
                            tipeee: res.data.premium_infos.tipeee,
                            patreon: res.data.premium_infos.patreon,
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
                reject(err)
            })
        })
    }

}

module.exports = ABCapi;
module.exports.run = async (opts)=>{
    const axios = require('axios');
    let baseURL = 'https://arcane-center.xyz/api/';
    let guilds;
    let useDjsMaster = false;
    let client = opts.client;
    try {
        if(require('discord.js').version.split('.').shift() === '12') useDjsMaster = true;
    } catch(e) {
        useDjsMaster = false;
    }


    if(client.shard) guilds = await client.shard.fetchClientValues(useDjsMaster ? 'guilds.cache.size' : 'guilds.size');

    let data = {
        server_count : client.shard ? guilds.reduce((prev, val) => prev + val, 0) :
            (useDjsMaster ? (client.guilds.cache.size ? client.guilds.cache.size : 0) :
                (client.guilds.size ? client.guilds.size : 0)),
        shard_count : client.shard ?  client.shard.count : 0,
    };

    let content = JSON.stringify(data,null);
    return new Promise(async (resolve, reject) => {
        await axios.post(baseURL + client.user.id + '/stats', content, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': content.length,
                'Authorization': opts.token
            }
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })

}
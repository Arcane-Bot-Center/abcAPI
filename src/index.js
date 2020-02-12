let useDjsMaster = false;
try {
    const DjsVersion = require('discord.js').version;
    if(DjsVersion.split('.').shift() === '12') useDjsMaster = true;
} catch(e) {
    useDjsMaster = false;
}

let settings = {
    token : '',
    id :''
};

module.exports = {
    login: (token, id) => new Promise((resolve, reject) => {

        if (typeof token != 'string') { reject(new Error('[Arcane-wrapper] No token provided')); }
        if(isNaN(id)) { reject(new Error('[Arcane-wrapper] No id provided'));  }

        settings.token = token;
        settings.id = id;

        resolve('[Arcane-wrapper] Ready to post');
    }),

    post: (client) => new Promise(async (resolve, reject) => {
        let users;
        let guilds;

        if(!client) { reject(new Error('[Arcane-wrapper] No library provided')); }
        if (!settings.token) { reject(new Error('[Arcane-wrapper] No token provided, You must initialized the module')); }
        if (!settings.id) { reject(new Error('[Arcane-wrapper] No id provided, You must initialized the module')); }
        if(client.shard) {
            users = await client.shard.fetchClientValues(useDjsMaster ? 'users.cache.size' : 'users.size'),
                guilds = await client.shard.fetchClientValues(useDjsMaster ? 'guilds.cache.size' : 'users.size');
        }

        let send = {
            member_count : client.shard ? users.reduce((prev, val) => prev + val, 0) : (useDjsMaster ? (client.users.cache.size ? client.users.cache.size : 0) : (client.users.size ? client.users.size : 0)),
            server_count : client.shard ? guilds.reduce((prev, val) => prev + val, 0) : (useDjsMaster ? (client.guilds.cache.size ? client.guilds.cache.size : 0) : (client.guilds.size ? client.guilds.size : 0)),
            shard_count : client.shard ?  client.shard.count : client.shards ? client.shards.size : 0,
        };

        console.log('[Arcane-wrapper] Send Data in progress...');
        sendData(send);
    }),

    update: (client) => {
        setInterval(function () {
            require('./index.js').post(client);
        }, 30000)
    }
};

function sendData(send) {
    const content = JSON.stringify(send, null);
    require('axios').post(`https://arcane-botcenter.xyz/api/${settings.id}/stats`, content, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': content.length,
            'Authorization': settings.token
        }
    }).then((res) => {
        if (res.status === 200){
            console.log(`[Arcane-wrapper] Stats posted ! => https://arcane-botcenter.xyz/api/${settings.id}/stats \n\nGuild: ${send.server_count}\nUsers: ${send.member_count}\nShard: ${send.shard_count}`);
        } else {
            console.log('An error has occurred')
        }
    }).catch((err) => {
        console.log(`[Arcane-wrapper] Stats post error ${err}`);
    });
}

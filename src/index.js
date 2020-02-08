const { post } = require('axios');

let settings = {
    token : '',
    id :''
};

module.exports = {
    login :(token, id) => new Promise((resolve, reject) => {
        if (typeof token != 'string') {
            reject(new Error('[Arcane-wrapper] No token provided'));
        }

        settings.token = token;

        if(isNaN(id)){
            reject(new Error('[Arcane-wrapper] No id provided'));
        }

        settings.id = id;
        resolve('[Arcane-wrapper] Ready to post');
    }),

    post: (server, user, shard) => new Promise((resolve, reject) => {
        if (!settings.token) {
            reject(new Error('[Arcane-wrapper] No token provided'));
        }

        if (!settings.id) {
            reject(new Error('[Arcane-wrapper] No id provided'));
        }

        if (server) {
            if (isNaN(server)) {
                reject(new TypeError('[Arcane-wrapper] Please indicate a valid number (server) !'));
            }
        } else if (user) {
            if (isNaN(user)) {
                reject(new TypeError('[Arcane-wrapper] Please indicate a valid number (user) !'));
            }
        } else if (shard) {
            if (isNaN(user)) {
                reject(new TypeError('[Arcane-wrapper] Please indicate a valid number (shard) !'));
            }
        }

        let send = {
            member_count : user ? user : 0,
            server_count : server ? server : 0,
            shard_count: shard ? shard : 0,
        };

        console.log('[Arcane-wrapper] Send Data in progress...');
        sendData(send);
    })
};

function sendData(send) {
    const content = JSON.stringify(send, null);
    post(`https://arcane-botcenter.xyz/api/${settings.id}/stats`, content, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': content.length,
            'Authorization': settings.token
        }
    }).then((res) => {
        console.log(`[Arcane-wrapper] Stats posted ! => https://arcane-botcenter.xyz/api/${settings.id}/stats \n\nGuild: ${send.server_count}\nUsers: ${send.member_count}\nShard: ${send.shard_count}`);
    }).catch((err)=> {
        console.error(`[Arcane-wrapper] Stats post error ${err}`);
    });
}
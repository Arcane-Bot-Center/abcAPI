module.exports.run = async (opts)=>{

    let data = {
        server_count : opts.client.guilds.size ? opts.client.guilds.size : 0,
        shard_count : opts.client.shard ?  opts.client.shard.count : 0,
    };

    return require('../utils/post').request(data,opts.token,opts.client.user.id)
};
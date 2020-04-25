module.exports.run = async (opts)=>{

    let data = {
        server_count : opts.client.bot.guilds.size ? opts.client.bot.guilds.size : opts.client.guilds.size ?  opts.client.guilds.size  : 0,
        shard_count : opts.client.bot.shards.size ?  opts.client.bot.shards.size : opts.client.shards.size ? opts.client.shards.size : 0,
    };

    return require('../utils/post').request(data,opts.token,opts.client.bot.user.id ? opts.client.bot.user.id : opts.client.user.id)
};
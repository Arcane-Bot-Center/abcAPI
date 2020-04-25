const Sharder = require('eris-sharder').Master;
const manager = new Sharder('bot token', '/main', {
    stats: true,
    debug: true,
    name: 'name your bot',
    guildsPerShard: 1300,
    shards: 1,
    clusters: 1,
    clientOptions: {
        disableEveryone: true,
        defaultImageSize: 512,
        defaultImageFormat: 'png'
    }
});

manager.on('stats', (stats) => {
    console.log(stats);
});